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

  async sendEnhancedBulkEmail(emailData: {
    campaignName: string;
    campaignType: string;
    recipients: string[];
    subject: string;
    fromName: string;
    content: string;
    resultEmail: string;
    sendTime?: string;
    scheduleDateTime?: string;
    priority?: string;
    trackOpens?: boolean;
    trackClicks?: boolean;
    allowUnsubscribe?: boolean;
  }) {
    const {
      campaignName,
      campaignType,
      recipients,
      subject,
      fromName,
      content,
      resultEmail,
      sendTime,
      scheduleDateTime,
      priority,
      trackOpens,
      trackClicks,
      allowUnsubscribe,
    } = emailData;

    const results = {
      success: 0,
      failure: 0,
      failedEmails: [] as string[],
      totalRecipients: recipients.length,
      campaignName,
      campaignType,
      startTime: new Date().toISOString(),
      endTime: '',
      processedEmails: [] as string[],
    };

    console.log(`Starting enhanced bulk email campaign: ${campaignName}`);
    console.log(`Campaign type: ${campaignType}`);
    console.log(`Recipients: ${recipients.length}`);

    if (!recipients || recipients.length === 0) {
      throw new Error('No recipients provided');
    }

    // Handle scheduling (for now, we'll process immediately but could add queue logic)
    if (sendTime === 'schedule' && scheduleDateTime) {
      console.log(`Campaign scheduled for: ${scheduleDateTime}`);
      // In a real implementation, you would queue this for later processing
    }

    // Process each recipient
    for (const recipient of recipients) {
      try {
        // Replace template variables in content
        let personalizedContent = content;
        personalizedContent = personalizedContent.replace(
          /{{name}}/g,
          recipient.split('@')[0],
        );
        personalizedContent = personalizedContent.replace(
          /{{email}}/g,
          recipient,
        );

        // Add unsubscribe link if enabled
        if (allowUnsubscribe) {
          personalizedContent += `\n\n---\nTo unsubscribe from future emails, click here: ${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(recipient)}`;
        }

        // Add tracking pixels if enabled (simplified implementation)
        if (trackOpens) {
          personalizedContent += `<img src="${process.env.BASE_URL}/track/open?campaign=${campaignName}&email=${encodeURIComponent(recipient)}" width="1" height="1" style="display:none;" />`;
        }

        const mailOptions: Mail.Options = {
          from: `"${fromName}" <certificates@precertificationn.com>`,
          to: recipient,
          subject: subject,
          html: personalizedContent,
          text: personalizedContent.replace(/<[^>]*>/g, ''), // Strip HTML for text version
          priority:
            priority === 'high'
              ? 'high'
              : priority === 'low'
                ? 'low'
                : 'normal',
        };

        // Add campaign headers
        mailOptions.headers = {
          'X-Campaign-Name': campaignName,
          'X-Campaign-Type': campaignType,
          'X-Mailer': 'CertifyPro-BulkEmail',
        };

        await this.transporter.sendMail(mailOptions);
        results.success++;
        results.processedEmails.push(recipient);
        console.log(`Email sent successfully to ${recipient}`);
      } catch (error) {
        console.error(`Failed to send email to ${recipient}:`, error);
        results.failure++;
        results.failedEmails.push(recipient);
      }

      // Rate limiting - adjust delay based on priority
      const delayMs =
        priority === 'high' ? 500 : priority === 'low' ? 2000 : 1000;
      await this.delay(delayMs);
    }

    results.endTime = new Date().toISOString();

    console.log('Enhanced bulk email campaign completed.');
    console.log(`Campaign: ${campaignName}`);
    console.log(`Success: ${results.success}, Failure: ${results.failure}`);

    // Prepare detailed results summary
    const resultsSummary = this.formatEnhancedResults(results);

    // Send results summary email to the requesting user
    try {
      await this.sendEmail(
        resultEmail,
        `Campaign Results - ${campaignName}`,
        `Bulk Email Campaign Results: ${campaignName}`,
        resultsSummary,
        [], // No attachments for the summary email
      );
    } catch (error) {
      console.error('Failed to send results summary email:', error);
    }

    return results;
  }

  private formatEnhancedResults(results: {
    success: number;
    failure: number;
    failedEmails: string[];
    totalRecipients: number;
    campaignName: string;
    campaignType: string;
    startTime: string;
    endTime: string;
    processedEmails: string[];
  }) {
    const duration =
      new Date(results.endTime).getTime() -
      new Date(results.startTime).getTime();
    const durationMinutes = Math.round(duration / 60000);
    const successRate = Math.round(
      (results.success / results.totalRecipients) * 100,
    );

    return `
Enhanced Bulk Email Campaign Results
=====================================

Campaign: ${results.campaignName}
Type: ${results.campaignType}
Started: ${new Date(results.startTime).toLocaleString()}
Completed: ${new Date(results.endTime).toLocaleString()}
Duration: ${durationMinutes} minutes

SUMMARY
-------
Total Recipients: ${results.totalRecipients}
Successfully Sent: ${results.success}
Failed: ${results.failure}
Success Rate: ${successRate}%

${
  results.failedEmails.length > 0
    ? `
FAILED EMAILS
------------
${results.failedEmails.join('\n')}
`
    : 'All emails were sent successfully! 🎉'
}

PROCESSED EMAILS
---------------
${results.processedEmails.slice(0, 10).join('\n')}${results.processedEmails.length > 10 ? `\n... and ${results.processedEmails.length - 10} more` : ''}

This report was generated automatically by CertifyPro.
    `;
  }
}
