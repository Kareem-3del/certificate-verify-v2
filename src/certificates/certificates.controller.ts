// src/certificates/certificates.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CertificatesService } from './certificates.service';
import { toDataURL } from 'qrcode';
import process from 'node:process';
import { EmailService } from '../email/email.service';
import { SettingsService } from './settings/settings.service';

@Controller('')
export class AppController {
  constructor(private readonly settingsService: SettingsService) {}
  @Get()
  @Render('index')
  async getHello() {
    const settings = await this.settingsService.findAll();
    return {
      settings,
    };
  }
}

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly certificatesService: CertificatesService,
    private readonly emailService: EmailService,
    private readonly settingsService: SettingsService,
  ) {}
  @Get('generate/:id')
  @Render('generate_v2') // Renders generate.ejs
  async generate(@Param('id') id: string) {
    if (!id) throw new Error('No ID provided');
    const settings = await this.settingsService.findOne(Number(id));
    console.log(settings);
    return {
      settings,
    };
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
