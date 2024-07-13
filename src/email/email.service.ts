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
    });
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    attachments: Buffer[],
  ) {
    const maxRetries = 3;
    let attempt = 0;
    const mailOptions: Mail.Options = {
      from: '"Info" <info@precertificationn.com>',
      to,
      subject,
      text,
      attachments: attachments.map((attachment) => ({
        filename: 'certificate.pdf',
        content: attachment,
        contentType: 'application/pdf',
      })),
    };

    while (attempt < maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} to send email...`);
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully:');
        return;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        attempt++;
        if (attempt < maxRetries) {
          await this.delay(3000); // Wait for 3 seconds before retrying
        }
      }
    }

    console.log("Can't Send");
  }
}
