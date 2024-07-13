import { ConfigService } from '@nestjs/config';

export const mailgunConfig = (configService: ConfigService) => ({
  apiKey: configService.get<string>('MAILGUN_API_KEY'),
  domain: configService.get<string>('MAILGUN_DOMAIN'),
  fromEmail: configService.get<string>('MAILGUN_FROM_EMAIL'),
});
