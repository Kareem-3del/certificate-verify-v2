// certificates.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { ILike, Repository } from 'typeorm';
import { PDFDocument, rgb } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
import { toDataURL } from 'qrcode';
import fontkit from '@pdf-lib/fontkit';
import * as process from 'node:process';
import { SettingsService } from './settings/settings.service';
const IMAGE_TEMPLATE_PATH_CERTIFICATE =
  'C:\\Users\\karee\\certificate-verify\\views\\templates\\template-1.png';
const IMAGE_TEMPLATE_PATH_ID_CARD =
  'C:\\Users\\karee\\certificate-verify\\views\\templates\\template-2.png';
@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private settingsService: SettingsService,
  ) {}
  generateUniqueNumericID() {
    const min = Math.pow(10, 9); // Minimum value for a 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum value for a 10-digit number

    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString();
  }
  async createCertificate(name: string): Promise<Certificate> {
    try {
      const certificate = new Certificate();
      const settings = await this.settingsService.findOne(1);
      // make id is long integer with 10 digits at least & some letters should be unique
      certificate.id = this.generateUniqueNumericID();
      certificate.name = name;
      certificate.issued = new Date();
      certificate.express = new Date(
        Date.now() + 2 * 365 * 24 * 60 * 60 * 1000,
      );
      certificate.instructor_id = settings.instructorId;
      certificate.instructor_name = settings.instructorName;
      certificate.training_center_name = settings.trainingCenterName;
      certificate.training_center_id = settings.trainingCenterId;
      certificate.city = settings.trainingCenterId;
      certificate.training_site_name = settings.trainingSiteName;
      certificate.training_center_id = settings.trainingCenterId;

      // save file in /certificates folder
      const pdf = await this.createPdfWithImage({
        fullName: certificate.name,
        issued: certificate.issued.toDateString(),
        expires: certificate.express.toDateString(),
        instructorId: certificate.instructor_id,
        instructorName: certificate.instructor_name,
        TrainingCenterName: certificate.training_center_name,
        TrainingCenterId: certificate.training_center_id,
        eCardCode: certificate.id,
        city: settings.tcCity,
        training_site_name: settings.trainingSiteName,
      });

      const card = await this.createCardID({
        fullName: certificate.name,
        issued: certificate.issued.toDateString(),
        expires: certificate.express.toDateString(),
        instructorId: certificate.instructor_id,
        instructorName: certificate.instructor_name,
        TrainingCenterName: certificate.training_center_name,
        TrainingCenterId: certificate.training_center_id,
        eCardCode: certificate.id,
        city: settings.tcCity,
        training_site_name: settings.trainingSiteName,
      });

      const filePathCertificate = path.resolve(
        __dirname,
        `../../certificates/${certificate.id}_certificate.pdf`,
      );

      const filePathCardId = path.resolve(
        __dirname,
        `../../certificates/${certificate.id}_id.pdf`,
      );

      fs.writeFileSync(filePathCertificate, pdf);
      fs.writeFileSync(filePathCardId, card);

      return await this.certificateRepository.save({
        ...certificate,
        certificate_path: filePathCertificate,
        id_path: filePathCardId,
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw error;
    }
  }

  async createPdfWithImage(data: {
    fullName: string;
    issued: string;
    expires: string;
    instructorId: string;
    TrainingCenterName: string;
    TrainingCenterId: string;
    instructorName: string;
    eCardCode: string;
    city: string;
    training_site_name: string;
  }): Promise<Buffer> {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Load the image
    const imageBytes = fs.readFileSync(IMAGE_TEMPLATE_PATH_CERTIFICATE);

    const pngImage = await pdfDoc.embedPng(imageBytes);

    // Get the dimensions of the image
    const { width, height } = pngImage.scale(0.5);

    // Add a page and draw the image on the center of the page
    const page = pdfDoc.addPage();
    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - width / 2,
      y: page.getHeight() / 2 - height / 2,
      width,
      height,
    });

    // Define font size and color
    const fontSize = 12;
    const fontColor = rgb(0, 0, 0);

    // Draw the text on the certificate at the specified positions
    page.drawText(data.fullName, {
      x: page.getWidth() / 2 - data.fullName.length * fontSize * 0.4,
      y: page.getHeight() / 2 + 80,
      size: fontSize * 1.5,
      color: fontColor,
    });
    page.drawText(data.issued, {
      x: 120,
      y: 380,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.expires, {
      x: 390,
      y: 380,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.TrainingCenterName, {
      x: 200 - (data.TrainingCenterName.length * fontSize) / 2,
      y: 340,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.TrainingCenterId, {
      x: 200 - (data.TrainingCenterId.length * fontSize) / 2,
      y: 300,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.instructorName, {
      x: 400 + data.instructorName.length,
      y: 340,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.instructorId, {
      x: 380 + data.instructorId.length,
      y: 300,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.eCardCode, {
      x: 400,
      y: 260,
      size: fontSize,
      color: fontColor,
    });

    page.drawText(data.city, {
      x: 190 - (data.city.length * fontSize) / 2,
      y: 260,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.training_site_name, {
      x: 190 - (data.training_site_name.length * fontSize) / 2,
      y: 220,
      size: fontSize,
      color: fontColor,
    });
    // Generate QR code
    console.log(toDataURL);
    const qrCodeUrl = await toDataURL(
      process.env.BASE_URL + '/certificates/verify/' + data.eCardCode,
    );

    // Extract the base64 part of the QR code URL
    const qrImageBytes = qrCodeUrl.split(',')[1];
    const qrImageBuffer = Buffer.from(qrImageBytes, 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBuffer);

    // Get the dimensions of the QR code image
    const qrWidth = 60;
    const qrHeight = 60;

    // Draw the QR code image on the page
    page.drawImage(qrImage, {
      x: 405,
      y: 175,
      width: qrWidth,
      height: qrHeight,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a Buffer
    return Buffer.from(pdfBytes);
  }
  formatDate(date: string) {
    const issuedDate = new Date(date);
    const year = issuedDate.getFullYear();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[issuedDate.getMonth()];
    const day = issuedDate.getDate().toString().padStart(2, '0');
    return `${day} ${month} ${year}`;
  }

  async createCardID(data: {
    fullName: string;
    issued: string;
    expires: string;
    instructorId: string;
    TrainingCenterName: string;
    TrainingCenterId: string;
    instructorName: string;
    training_site_name: string;
    city: string;
    eCardCode: string;
  }): Promise<Buffer> {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Load the image
    const imageBytes = fs.readFileSync(IMAGE_TEMPLATE_PATH_ID_CARD);

    const pngImage = await pdfDoc.embedPng(imageBytes);

    // Get the dimensions of the image
    const { width, height } = pngImage.scale(0.5);

    // Add a page and draw the image on the center of the page
    const page = pdfDoc.addPage();
    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - width / 2,
      y: page.getHeight() - height - 50,
      width,
      height,
    });

    // Define font size and color
    const fontSize = 9;
    const fontColor = rgb(0, 0, 0);

    // Draw the text on the certificate at the specified positions
    page.drawText(data.fullName, {
      x: 180 - data.fullName.length * fontSize * 0.5,
      y: 720,
      size: fontSize * 1.2,
      color: fontColor,
    });
    page.drawText(data.city, {
      x: 348,
      y: 705,
      size: fontSize,
      color: fontColor,
    });

    page.drawText(data.TrainingCenterId, {
      x: 348,
      y: 725,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.TrainingCenterName, {
      x: 348,
      y: 745,
      size: fontSize,
      color: fontColor,
    });

    page.drawText(data.training_site_name, {
      x: 348,
      y: 685,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.instructorName, {
      x: 348,
      y: 665,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(data.instructorId, {
      x: 348,
      y: 652,
      size: fontSize,
      color: fontColor,
    });
    page.drawText(this.formatDate(data.issued), {
      x: 59,
      y: 660,
      size: 8,
      color: fontColor,
    });

    page.drawText(this.formatDate(data.expires), {
      x: 118,
      y: 660,
      size: 8,
      color: fontColor,
    });
    page.drawText(data.eCardCode, {
      x: 175,
      y: 660,
      size: 8,
      color: fontColor,
    });

    // Generate QR code
    console.log(toDataURL);
    const qrCodeUrl = await toDataURL(
      process.env.BASE_URL + '/certificates/verify/' + data.eCardCode,
    );

    // Extract the base64 part of the QR code URL
    const qrImageBytes = qrCodeUrl.split(',')[1];
    const qrImageBuffer = Buffer.from(qrImageBytes, 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBuffer);

    // Get the dimensions of the QR code image
    const qrWidth = 60;
    const qrHeight = 60;

    // Draw the QR code image on the page
    page.drawImage(qrImage, {
      x: 233,
      y: 635,
      width: qrWidth,
      height: qrHeight,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a Buffer
    return Buffer.from(pdfBytes);
  }
  async verifyCertificate(id: string): Promise<Certificate> {
    return this.certificateRepository.findOneBy({ id });
  }

  async search(query: string, limit: number, offset: number) {
    return this.certificateRepository.findAndCount({
      where: [
        { name: ILike(`%${query}%`) },
        { id: ILike(`%${query}%`) },
        { city: ILike(`%${query}%`) },
        { training_site_name: ILike(`%${query}%`) },
        { training_center_name: ILike(`%${query}%`) },
        { instructor_name: ILike(`%${query}%`) },
        { instructor_id: ILike(`%${query}%`) },
      ],
      take: limit,
      skip: offset,
    });
  }

  async deleteCertificate(id: string): Promise<void> {
    const certificate = await this.certificateRepository.findOneBy({ id });
    if (!certificate) {
      throw new NotFoundException();
    }
    // delete
    console.log(certificate);
    if (certificate.certificate_path)
      fs.unlinkSync(certificate.certificate_path);
    if (certificate.id_path) fs.unlinkSync(certificate.id_path);
    await this.certificateRepository.delete({ id });
  }

  async renewCertificate(id: string): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOneBy({ id });
    certificate.express = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000);
    return this.certificateRepository.save(certificate);
  }
}
