import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendCertificateEmail(
    to: string,
    fullName: string,
    issueDate: string,
    certificatePath: string,
  ): Promise<void> {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Certificate Generated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
          }
          .header img {
            max-width: 100px;
          }
          .content {
            text-align: center;
            padding: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px 0;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Certificate Generated</h1>
          </div>
          <div class="content">
            <p>Dear ${fullName},</p>
            <p>Congratulations! Your certificate has been successfully generated.</p>
            <p><strong>Issue Date:</strong> ${issueDate}</p>
            <p>You can find your certificate attached to this email.</p>
          </div>
          <div class="footer">
            <p>Thank you for using our service.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"${this.configService.get('EMAIL_NAME')}" <${this.configService.get('EMAIL_SENDER')}>`, // Replace with your sender email address
      to,
      subject: 'Your Certificate is Ready',
      html: htmlTemplate,
      attachments: [
        {
          filename: path.basename(certificatePath),
          path: certificatePath,
          contentType: 'application/pdf',
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }
}
