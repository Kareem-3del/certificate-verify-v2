// src/certificates/certificates.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Render,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { CertificatesService } from './certificates.service';
import { toDataURL } from 'qrcode';
import process from 'node:process';
import * as fs from 'node:fs';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get('generate')
  @Render('generate') // Renders generate.ejs
  generateCertificateForm() {
    return {
      title: 'Generate Certificate',
    };
  }

  @Post('generate')
  @Render('certificate-overview') // Renders generate.ejs
  async generateCertificate(
    @Body() body: { name: string },
    @Res() res: Response,
  ) {
    try {
      const certificate = await this.certificatesService.createCertificate(
        body.name,
      );
      return {
        ...certificate,
      };
    } catch (error) {
      console.error('Error generating certificate.ejs:', error);
      res.status(500).send('Error generating certificate.ejs.');
    }
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
        const fileData = await this.certificatesService.mergeCertificate(id);
        const filePath = `./certificates/${id}.pdf`;
        fs.writeFileSync(filePath, fileData);
        return res.download(filePath);
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
