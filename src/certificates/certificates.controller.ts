// src/certificates/certificates.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';

import { CertificatesService } from './certificates.service';
import { toDataURL } from 'qrcode';
import process from 'node:process';
import { EmailService } from '../email/email.service';
import { SettingsService } from './settings/settings.service';
import { Certificate } from './certificate.entity';
import { ConfigService } from '@nestjs/config';

@Controller('')
export class AppController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly certificatesService: CertificatesService,
  ) {}
  @Get()
  @Render('index')
  async getHello() {
    const settings = await this.settingsService.findAll();
    return {
      settings,
    };
  }
  @Get('settings/email')
  @Render('send-bulk-email')
  async email() {
    const certificates = await this.certificatesService.getByType('all');
    return {
      emails: Array.from(
        new Set(
          certificates.map((cert) => {
            return cert.email;
          }),
        ),
      ).join(',\n'),
    };
  }
}

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly certificatesService: CertificatesService,
    private readonly emailService: EmailService,
    private readonly settingsService: SettingsService,
    private readonly configService: ConfigService,
  ) {}

  @Post('send-bulk')
  async sendBulkEmail(
    @Body('recipients') recipients: string[],
    @Body('name') name: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('resultEmail') resultEmail: string,
    @Res() res: Response,
  ) {
    try {
      const results = await this.emailService.sendBulkEmail(
        recipients,
        name,
        subject,
        text,
        resultEmail,
      );

      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get('export/:id/')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="certificates.csv"')
  async export(@Param('id') id: string, @Res() res: Response) {
    if (!id) {
      throw new BadRequestException('No ID provided');
    }

    try {
      let certificates: (Certificate & { link_verify?: string })[];
      if (id && id !== 'all') {
        const settings = await this.settingsService.findOne(Number(id));
        certificates = await this.certificatesService.getByType(settings.name);
      } else if (id === 'all') {
        certificates = await this.certificatesService.getByType('all');
      }
      certificates = certificates.map((cert) => {
        cert.link_verify = `${this.configService.get('BASE_URL')}/certificates/verify/${cert.id}`;
        return cert;
      });

      const csvBuffer =
        await this.certificatesService.generateCSVBuffer(certificates);

      console.log('err', csvBuffer);
      res.send(csvBuffer);
    } catch (err) {
      console.log('Error', err);
    }
  }

  @Get('generate/:id')
  // @Render('generate_v2') // Renders generate.ejs
  async generate(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.user) {
      res.render('login', { error: 'Please login to generate certificates' });
    }

    if (!id) throw new Error('No ID provided');
    const settings = await this.settingsService.findOne(Number(id));
    console.log(settings);
    res.render('generate_v2', { settings });
  }

  @Post('generate')
  @Render('certificate') // Renders generate.ejs
  async generateCertificate(
    @Body() body: { name: string; email: string; index: number },
  ) {
    const certificate = await this.certificatesService.createCertificate(
      body.name,
      body.email,
      Number(body.index),
    );
    console.log('Certificate:', certificate);
    return {
      ...certificate,
    };
  }

  @Render('certificate-overview') // Renders verify.ejs
  @Get('verify/:id')
  async verifyCertificate(@Param('id') id: string) {
    try {
      const certificate = await this.certificatesService.verifyCertificate(id);
      if (!certificate) {
        return {
          error: 'Certificate Not Found',
          notFound: true,
        };
      }
      const qrCodeUrl = await toDataURL(
        process?.env?.BASE_URL + '/certificates/verify/' + certificate.id,
      );
      console.log('Certificate:', certificate);
      return {
        ...certificate,
        id: certificate.id,
        qr: qrCodeUrl,
        notFound: false,
      };
    } catch (error) {
      console.error('Error verifying certificate.ejs:', error);
      return {
        error: 'Error verifying certificate.ejs.',
        notFound: true,
      };
    }
  }

  @Get('download/:id')
  async downloadCertificate(
    @Param('id') id: string,
    @Res() res: Response,
    @Query('type') type: 'id' | 'certificate' | 'full' = 'full',
  ) {
    try {
      const certificate = await this.certificatesService.verifyCertificate(id);
      if (!certificate) {
        return res.status(404).send('Certificate Not Found');
      }
      // certificate.certificate_path
      // certificate.id
      if (type === 'full') {
        return res.download(certificate.id_and_cert_path);
      }
      // depending on the type, we will download the certificate or the ID
      const filePath =
        type === 'id' ? certificate.id_path : certificate.certificate_path;
      if (!filePath) {
        return res.status(404).send('File Not Found');
      }
      try {
        res.download(filePath);
      } catch (error) {
        console.error('Error downloading certificate:', error);
        res.status(500).send('Error downloading certificate.');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
      res.status(500).send('Error downloading certificate.');
    }
  }

  @Get('')
  async search(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('search') searchQuery: string,
  ) {
    const [certificates, total] = await this.certificatesService.search(
      searchQuery,
      limit,
      offset,
    );
    return { certificates, total };
  }

  @Delete(':id')
  async deleteCertificate(@Param('id') id: string) {
    await this.certificatesService.deleteCertificate(id);
  }

  @Post('renew/:id')
  async renewCertificate(@Param('id') id: string) {
    await this.certificatesService.renewCertificate(id);
  }
}
