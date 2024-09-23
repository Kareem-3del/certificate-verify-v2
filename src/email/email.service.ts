import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'precertificationn.com', // Outgoing Server
      port: 465, // SMTP Port
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate issue
      },
    });
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private formatResults(results: {
    success: number;
    failure: number;
    failedEmails: string[];
  }) {
    return `
      Bulk email sending completed.

      Success: ${results.success}
      Failure: ${results.failure}
      
      ${results.failedEmails.length > 0 ? `Failed emails:\n${results.failedEmails.join('\n')}` : ''}
    `;
  }

  async sendEmail(
    to: string,
    file_name: string,
    subject: string,
    text: string,
    attachments: Buffer[],
    images: {
      filename: string;
      // base64 encoded image
      content: string;
      contentType: string;
    }[] = [],
  ) {
    const mailOptions: Mail.Options = {
      from: '"Certificates" <certificates@precertificationn.com>',
      to,
      subject,
      text,
      attachments: [
        ...attachments.map((attachment) => ({
          filename: `${file_name}.pdf`,
          content: attachment,
          contentType: 'application/pdf',
        })),
        ...images.map((image) => ({
          filename: image.filename,
          content: Buffer.from(image.content, 'base64'),
          contentType: image.contentType,
        })),
      ],
    };

    try {
      console.log('send options', await this.transporter.sendMail(mailOptions));
      console.log(`Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      return false;
    }
  }

  async sendBulkEmail(
    recipients: string[],
    name: string,
    subject: string,
    text: string,
    resultEmail: string, // Email to send results to
    attachments?: {
      filename: string;
      content: string;
      contentType: string;
    }[],
  ) {
    const results = {
      success: 0,
      failure: 0,
      failedEmails: [] as string[],
    };

    console.log('Emails', recipients);
    if (!recipients || recipients.length === 0)
      throw new Error('No Email Exists');

    for (const to of recipients) {
      const success = await this.sendEmail(
        to,
        name,
        subject,
        text,
        [], // Assuming this is for additional options, modify as needed
        attachments, // Pass attachments to the sendEmail function
      );
      if (success) {
        results.success++;
      } else {
        results.failure++;
        results.failedEmails.push(to);
      }

      // Delay to avoid hitting rate limits
      await this.delay(1000); // 1 second delay between each email
    }

    console.log('Bulk email sending completed.');
    console.log(`Success: ${results.success}, Failure: ${results.failure}`);
    if (results.failedEmails.length > 0) {
      console.log('Failed emails:', results.failedEmails);
    }

    const resultsSummary = this.formatResults(results);

    // Send results summary email
    await this.sendEmail(
      resultEmail,
      'Bulk Email Results',
      'Bulk Email Sending Results',
      resultsSummary,
      [], // No attachments for the summary email
    );

    return results;
  }
}
