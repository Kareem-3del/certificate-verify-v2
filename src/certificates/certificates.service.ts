import * as path from 'path';
import { Parser } from 'json2csv';

const Template_1: TemplateData = {
  image_cert: path.resolve('./views/templates/template-1.png'),
  image_id: path.resolve('./views/templates/template-1-card.png'),
  settings: 1,

  id_card: {
    fontSize: 8,
    fullName: {
      x: 170,
      y: 720,
    },
    issued: {
      x: 59,
      y: 660,
    },
    expires: {
      x: 118,
      y: 660,
    },
    instructorId: {
      x: 348,
      y: 652,
    },
    instructorName: {
      x: 348,
      y: 665,
    },
    TrainingCenterName: {
      x: 348,
      y: 745,
    },
    TrainingCenterId: {
      x: 348,
      y: 725,
    },
    eCardCode: {
      x: 175,
      y: 660,
    },
    city: {
      x: 348,
      y: 705,
    },
    training_site_name: {
      x: 348,
      y: 685,
    },
    qrCode: {
      x: 233,
      y: 635,
    },
  },
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 585,
      center: true,
    },
    expires: {
      x: 445,
      y: 465,
      center: true,
    },
    instructorName: {
      x: 435,
      y: 425,
      center: true,
    },
    instructorId: {
      x: 435,
      y: 385,
      center: true,
    },
    eCardCode: {
      x: 435,
      y: 345,
      center: true,
    },
    qrCode: {
      x: 405,
      y: 260,
    },
    issued: {
      x: 175,
      y: 465,
      center: true,
    },
    TrainingCenterName: {
      x: 165,
      y: 425,
      center: true,
    },
    TrainingCenterId: {
      x: 165,
      y: 385,
      center: true,
    },
    city: {
      x: 165,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 165,
      y: 305,
      center: true,
    },
  },
};
const Template_2: TemplateData = {
  image_cert: path.resolve('./views/templates/template-2.png'),
  image_id: path.resolve('./views/templates/template-2-card.png'),
  settings: 2,
  id_card: {
    fontSize: 8,
    fullName: {
      x: 180,
      y: 720,
    },
    issued: {
      x: 59,
      y: 660,
    },
    expires: {
      x: 118,
      y: 660,
    },
    instructorId: {
      x: 348,
      y: 655,
    },
    instructorName: {
      x: 3048,
      y: 665,
    },
    TrainingCenterName: {
      x: 348,
      y: 745,
    },
    TrainingCenterId: {
      x: 348,
      y: 720,
    },
    eCardCode: {
      x: 175,
      y: 660,
    },
    city: {
      x: 348,
      y: 700,
    },
    training_site_name: {
      x: 348,
      y: 675,
    },
    qrCode: {
      w: 60,
      h: 55,
      x: 235,
      y: 632,
    },
  },
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 575,
      center: true,
    },
    expires: {
      x: 428,
      y: 475,
      center: true,
    },
    instructorName: {
      x: 41500000,
      y: 425,
      center: true,
    },
    instructorId: {
      x: 415,
      y: 435,
      center: true,
    },
    eCardCode: {
      x: 415,
      y: 395,
      center: true,
    },
    qrCode: {
      x: 385,
      y: 310,
    },
    issued: {
      x: 175,
      y: 475,
      center: true,
    },
    TrainingCenterName: {
      x: 165,
      y: 435,
      center: true,
    },
    TrainingCenterId: {
      x: 165,
      y: 385,
      center: true,
    },
    city: {
      x: 165,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 165,
      y: 310,
      center: true,
    },
  },
};
const Template_3: TemplateData = {
  image_cert: path.resolve('./views/templates/template-3.png'),
  image_id: path.resolve('./views/templates/template-3-card.png'),
  settings: 3,
  id_card: {
    fontSize: 8,
    fullName: {
      x: 180,
      y: 720,
    },
    issued: {
      x: 59,
      y: 660,
    },
    expires: {
      x: 118,
      y: 660,
    },
    instructorId: {
      x: 348,
      y: 655,
    },
    instructorName: {
      x: 3048,
      y: 665,
    },
    TrainingCenterName: {
      x: 348,
      y: 745,
    },
    TrainingCenterId: {
      x: 348,
      y: 720,
    },
    eCardCode: {
      x: 175,
      y: 660,
    },
    city: {
      x: 348,
      y: 700,
    },
    training_site_name: {
      x: 348,
      y: 675,
    },
    qrCode: {
      w: 60,
      h: 55,
      x: 235,
      y: 632,
    },
  },
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 575,
      center: true,
    },
    expires: {
      x: 438,
      y: 475,
      center: true,
    },
    instructorName: {
      x: 41500000,
      y: 425,
      center: true,
    },
    instructorId: {
      x: 425,
      y: 435,
      center: true,
    },
    eCardCode: {
      x: 425,
      y: 395,
      center: true,
    },
    qrCode: {
      x: 395,
      y: 310,
    },
    issued: {
      x: 175,
      y: 475,
      center: true,
    },
    TrainingCenterName: {
      x: 165,
      y: 435,
      center: true,
    },
    TrainingCenterId: {
      x: 165,
      y: 385,
      center: true,
    },
    city: {
      x: 165,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 165,
      y: 310,
      center: true,
    },
  },
};
const Template_4: TemplateData = {
  image_cert: path.resolve('./views/templates/template-4.png'),
  image_id: path.resolve('./views/templates/template-4-card.png'),
  settings: 4,

  id_card: {
    fontSize: 8,
    fullName: {
      x: 170,
      y: 720,
      center: true,
    },
    issued: {
      x: 59,
      y: 660,
    },
    expires: {
      x: 118,
      y: 660,
    },
    instructorId: {
      x: 348,
      y: 648,
    },
    instructorName: {
      x: 348,
      y: 665,
    },
    TrainingCenterName: {
      x: 348,
      y: 745,
    },
    TrainingCenterId: {
      x: 348,
      y: 720,
    },
    eCardCode: {
      x: 175,
      y: 660,
    },
    city: {
      x: 348,
      y: 700,
    },
    training_site_name: {
      x: 348,
      y: 685,
    },
    qrCode: {
      x: 233,
      y: 635,
      w: 55,
      h: 55,
    },
  },
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 585,
      center: true,
    },
    expires: {
      x: 435,
      y: 465,
      center: true,
    },
    instructorName: {
      x: 420,
      y: 425,
      center: true,
    },
    instructorId: {
      x: 420,
      y: 385,
      center: true,
    },
    eCardCode: {
      x: 420,
      y: 345,
      center: true,
    },
    qrCode: {
      x: 390,
      y: 260,
    },
    issued: {
      x: 162,
      y: 465,
      center: true,
    },
    TrainingCenterName: {
      x: 155,
      y: 430,
      center: true,
    },
    TrainingCenterId: {
      x: 155,
      y: 375,
      center: true,
    },
    city: {
      x: 155,
      y: 335,
      center: true,
    },
    training_site_name: {
      x: 155,
      y: 285,
      center: true,
    },
  },
};
const Template_5: TemplateData = {
  image_cert: path.resolve('./views/templates/template-5.png'),
  image_id: path.resolve('./views/templates/template-5-card.png'),
  settings: 5,

  id_card: {
    fontSize: 8,
    fullName: {
      x: 170,
      y: 715,
    },
    TrainingCenterName: {
      x: 348,
      y: 740,
    },
    TrainingCenterId: {
      x: 348,
      y: 720,
    },
    city: {
      x: 348,
      y: 700,
    },
    training_site_name: {
      x: 348,
      y: 680,
    },
    instructorName: {
      x: 348,
      y: 660,
    },
    instructorId: {
      x: 348,
      y: 648,
    },
    issued: {
      x: 59,
      y: 660,
    },
    expires: {
      x: 118,
      y: 660,
    },
    eCardCode: {
      x: 202,
      y: 660,
      center: true,
    },

    qrCode: {
      x: 233,
      y: 635,
      w: 55,
      h: 55,
    },
  },
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 545,
      center: true,
    },
    expires: {
      x: 450,
      y: 430,
      center: true,
    },
    instructorName: {
      x: 438,
      y: 425 - 35,
      center: true,
    },
    instructorId: {
      x: 438,
      y: 385 - 35,
      center: true,
    },
    eCardCode: {
      x: 438,
      y: 345 - 35,
      center: true,
    },
    qrCode: {
      x: 410,
      y: 260 - 35,
    },
    issued: {
      x: 180,
      y: 430,
      center: true,
    },
    TrainingCenterName: {
      x: 172,
      y: 425 - 35,
      center: true,
    },
    TrainingCenterId: {
      x: 172,
      y: 335,
      center: true,
    },
    city: {
      x: 172,
      y: 300,
      center: true,
    },
    training_site_name: {
      x: 172,
      y: 245,
      center: true,
    },
  },
};
const Template_6: TemplateData = {
  image_cert: path.resolve('./views/templates/template-6.png'),
  image_id: path.resolve('./views/templates/template-7-card.png'),
  settings: 6,

  id_card: {
    fontSize: 8,
    fullName: {
      x: 170,
      y: 710,
      center: true,
    },
    issued: {
      x: 78,
      y: 653,
      center: true,
    },
    expires: {
      x: 138,
      y: 653,
      center: true,
    },
    eCardCode: {
      x: 194,
      y: 653,
      center: true,
    },
    instructorId: {
      x: 352,
      y: 640,
    },
    instructorName: {
      x: 352,
      y: 655,
    },
    TrainingCenterName: {
      x: 352,
      y: 738,
    },
    TrainingCenterId: {
      x: 352,
      y: 718,
    },

    city: {
      x: 352,
      y: 695,
    },
    training_site_name: {
      x: 352,
      y: 675,
    },
    qrCode: {
      w: 60,
      h: 55,
      x: 235,
      y: 622,
    },
  },
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 585,
      center: true,
    },
    expires: {
      x: 448,
      y: 465 - 5,
      center: true,
    },
    instructorName: {
      x: 435,
      y: 415,
      center: true,
    },
    instructorId: {
      x: 435,
      y: 375,
      center: true,
    },
    eCardCode: {
      x: 435,
      y: 335,
      center: true,
    },
    qrCode: {
      x: 405,
      y: 250,
    },
    issued: {
      x: 170,
      y: 460,
      center: true,
    },
    TrainingCenterName: {
      x: 155,
      y: 420,
      center: true,
    },
    TrainingCenterId: {
      x: 155,
      y: 365,
      center: true,
    },
    city: {
      x: 155,
      y: 325,
      center: true,
    },
    training_site_name: {
      x: 155,
      y: 285,
      center: true,
    },
  },
};
const Template_7: TemplateData = {
  image_cert: path.resolve('./views/templates/template-7.png'),
  image_id: path.resolve('./views/templates/template-6-card.png'),
  settings: 7,
  cert_card: {
    fontSize: 12,
    fullName: {
      x: 595.28 / 2,
      y: 575,
      center: true,
    },
    expires: {
      x: 440,
      y: 467,
      center: true,
    },
    instructorName: {
      x: 41500000,
      y: 425,
      center: true,
    },
    instructorId: {
      x: 428,
      y: 428,
      center: true,
    },
    eCardCode: {
      x: 428,
      y: 388,
      center: true,
    },
    qrCode: {
      x: 400,
      y: 300,
    },
    issued: {
      x: 175,
      y: 468,
      center: true,
    },
    TrainingCenterName: {
      x: 162,
      y: 430,
      center: true,
    },
    TrainingCenterId: {
      x: 162,
      y: 378,
      center: true,
    },
    city: {
      x: 162,
      y: 338,
      center: true,
    },
    training_site_name: {
      x: 162,
      y: 304,
      center: true,
    },
  },
  id_card: {
    fontSize: 8,
    fullName: {
      x: 170,
      y: 710,
      center: true,
    },
    issued: {
      x: 82,
      y: 650,
      center: true,
    },
    expires: {
      x: 142,
      y: 650,
      center: true,
    },
    eCardCode: {
      x: 194,
      y: 650,
      center: true,
    },
    instructorId: {
      x: 352,
      y: 647,
    },
    instructorName: {
      x: 3048,
      y: 665,
    },
    TrainingCenterName: {
      x: 352,
      y: 735,
    },
    TrainingCenterId: {
      x: 352,
      y: 710,
    },

    city: {
      x: 352,
      y: 690,
    },
    training_site_name: {
      x: 352,
      y: 665,
    },
    qrCode: {
      w: 60,
      h: 55,
      x: 235,
      y: 622,
    },
  },
};
const Template_8: TemplateData = {
  image_id: path.resolve('./views/templates/custom.png'),
  settings: 8,
  id_card: {
    fontSize: 8,
    fullName: {
      x: 80,
      y: 706,
      scale: 1,
      center: false,
    },
    issued: {
      x: 108,
      y: 672.5,
      fontSize: 6.5,
    },
    expires: {
      x: 240,
      y: 672.5,
      fontSize: 6.5,
    },
    eCardCode: {
      x: 70,
      y: 660,
    },
    instructorId: {
      x: 220,
      y: 660,
    },
    instructorName: {
      x: 68,
      y: 684.5,
    },
    TrainingCenterName: {
      x: 3502,
      y: 735,
    },
    TrainingCenterId: {
      x: 3520,
      y: 710,
    },

    city: {
      x: 3520,
      y: 690,
    },
    training_site_name: {
      x: 3520,
      y: 665,
    },
    qrCode: {
      w: 60,
      h: 60,
      x: 508,
      y: 618,
    },
  },
};

// certificates.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { ILike, Repository } from 'typeorm';
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import { toDataURL } from 'qrcode';
import fontkit from '@pdf-lib/fontkit';
import * as process from 'node:process';
import { SettingsService } from './settings/settings.service';
import { EmailService } from '../email/email.service';

interface TemplatePosition {
  fontSize: number;
  fullName: {
    x: number;
    y: number;
    center?: boolean;
    scale?: number;
  };
  issued: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
  };
  expires: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
  };
  instructorId: {
    x: number;
    y: number;
    center?: boolean;
  };
  instructorName: {
    x: number;
    y: number;
    center?: boolean;
  };
  TrainingCenterName: {
    x: number;
    y: number;
    center?: boolean;
  };
  TrainingCenterId: {
    x: number;
    y: number;
    center?: boolean;
  };
  eCardCode: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
  };
  city: {
    x: number;
    y: number;
    center?: boolean;
  };
  training_site_name: {
    x: number;
    y: number;
    center?: boolean;
  };
  qrCode: {
    w?: number;
    h?: number;
    x: number;
    y: number;
  };
}

interface TemplateData {
  image_cert?: string;
  image_id: string;
  settings: number;
  id_card: TemplatePosition;
  cert_card?: TemplatePosition;
}

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private settingsService: SettingsService,
    private emailService: EmailService,
  ) {}

  async getByType(type: string | 'all') {
    if (type == 'all') {
      return this.certificateRepository.find();
    } else {
      return this.certificateRepository.find({
        where: {
          type: type,
        },
      });
    }
  }

  async generateCSVBuffer(
    certificates: (Certificate & { link_verify?: string })[],
  ): Promise<Buffer> {
    const fields = [
      'id',
      'name',
      'link_verify',
      'email',
      'city',
      'training_site_name',
      'type',
      'issued',
      'express',
      'instructor_id',
      'instructor_name',
      'renew_by',
      'training_center_name',
      'training_center_id',
      'created_at',
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(certificates);

    return Buffer.from(csv);
  }
  generateUniqueNumericID() {
    const min = Math.pow(10, 9); // Minimum value for a 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum value for a 10-digit number

    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString();
  }

  async createCertificate(
    name: string,
    email: string,
    templateIndex: number,
  ): Promise<Certificate> {
    try {
      const template = [
        Template_1,
        Template_2,
        Template_3,
        Template_4,
        Template_5,
        Template_6,
        Template_7,
        Template_8,
      ][templateIndex - 1];
      if (!template) {
        console.log('Template not found', templateIndex);
        throw new NotFoundException('Template not found');
      }
      const certificate = new Certificate();
      const settings = await this.settingsService.findOne(template.settings);
      // make id is long integer with 10 digits at least & some letters should be unique
      certificate.id = this.generateUniqueNumericID();
      certificate.name = name;
      certificate.issued = new Date();
      certificate.email = email;
      certificate.express = new Date(
        Date.now() + 2 * 365 * 24 * 60 * 60 * 1000,
      );

      certificate.instructor_id = settings.instructorId;
      certificate.instructor_name = settings.instructorName;
      certificate.training_center_name = settings.trainingCenterName;
      certificate.training_center_id = settings.trainingCenterId;
      certificate.type = settings.name;
      certificate.city = settings.trainingCenterId;
      certificate.training_site_name = settings.trainingSiteName;
      certificate.training_center_id = settings.trainingCenterId;

      // save file in /certificates folder

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
        positions: template.id_card,
        image: template.image_id,
      });

      let pdf: Buffer;
      if (template.image_cert) {
        pdf = await this.createCardID({
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
          positions: template.cert_card,
          image: template.image_cert,
        });
      }

      let certificatePdf: PDFDocument;
      if (pdf) {
        certificatePdf = await PDFDocument.load(pdf);
      }

      const pdfDoc = await PDFDocument.create();
      const idPdf = await PDFDocument.load(card);

      let copiedCertificatePage: PDFPage[];
      if (certificatePdf) {
        copiedCertificatePage = await pdfDoc.copyPages(certificatePdf, [0]);
      }

      const copiedIdPage = await pdfDoc.copyPages(idPdf, [0]);

      if (copiedCertificatePage) pdfDoc.addPage(copiedCertificatePage[0]);

      pdfDoc.addPage(copiedIdPage[0]);
      const filePath = `./certificates/${certificate.id}.pdf`;
      const filePathCertificate = path.resolve(
        __dirname,
        `../../certificates/${certificate.id}_certificate.pdf`,
      );
      const pdfBytes = await pdfDoc.save();
      const fileData = Buffer.from(pdfBytes);

      fs.writeFileSync(filePath, fileData);
      if (pdf) fs.writeFileSync(filePathCertificate, pdf);

      const filePathCardId = path.resolve(
        __dirname,
        `../../certificates/${certificate.id}_id.pdf`,
      );

      fs.writeFileSync(filePathCardId, card);
      this.emailService
        .sendEmail(email, name, settings.emailSubject, settings.emailBody, [
          fileData,
        ])
        .then(() => {
          console.log('Email sent');
        });
      return await this.certificateRepository.save({
        ...certificate,
        certificate_path: template.image_cert
          ? filePathCertificate
          : filePathCardId,
        id_path: filePathCardId,
        id_and_cert_path: template.image_cert ? filePath : filePathCardId,
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw error;
    }
  }

  formatDate(date: string, hideDay?: boolean) {
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
    const day = !hideDay
      ? issuedDate.getDate().toString().padStart(2, '0') + ' '
      : '';
    return `${day}${month} ${year}`;
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
    positions: TemplatePosition;
    image: string;
  }): Promise<Buffer> {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Load the image
    const imageBytes = fs.readFileSync(data.image);

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
    const fontSize = data.positions.fontSize;
    const fontColor = rgb(0, 0, 0);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaFontBold = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold,
    );

    const calcTextWidth = (text: string, textSize: number): number => {
      const textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      return textWidth / 2;
    };

    const calcTextWidth2 = (text: string, textSize: number): number => {
      const textWidth = helveticaFontBold.widthOfTextAtSize(text, textSize);
      return textWidth / 2;
    };
    // Draw the text on the certificate at the specified positions
    page.drawText(data.fullName, {
      x:
        (data.positions.fullName.x || 180) -
        (data.positions.fullName.center
          ? calcTextWidth2(
              data.fullName,
              fontSize * (data.positions.fullName.scale || 1.2),
            )
          : 0),
      y: data.positions.fullName.y || 720,
      size: fontSize * (data.positions.fullName.scale || 1.2),
      color: fontColor,
      font: helveticaFontBold,
    });
    page.drawText(data.city, {
      x:
        (data.positions.city.x || 348) -
        (data.positions.city.center ? calcTextWidth(data.city, fontSize) : 0),
      y: data.positions.city.y || 705,
      size: fontSize,
      font: helveticaFont,
      color: fontColor,
    });

    page.drawText(data.TrainingCenterId, {
      x:
        (data.positions.TrainingCenterId.x || 348) -
        (data.positions.TrainingCenterId.center
          ? calcTextWidth(data.TrainingCenterId, fontSize)
          : 0),
      y: data.positions.TrainingCenterId.y || 725,
      size: fontSize,
      color: fontColor,
      font: helveticaFont,
    });
    page.drawText(data.TrainingCenterName, {
      x:
        (data.positions.TrainingCenterName.x || 348) -
        (data.positions.TrainingCenterName.center
          ? calcTextWidth(data.TrainingCenterName, fontSize)
          : 0),
      y: data.positions.TrainingCenterName.y || 745,
      size: fontSize,
      color: fontColor,
      font: helveticaFont,
    });

    page.drawText(data.training_site_name, {
      x:
        (data.positions.training_site_name.x || 348) -
        (data.positions.training_site_name.center
          ? calcTextWidth(data.training_site_name, fontSize)
          : 0),
      y: data.positions.training_site_name.y || 685,
      size: fontSize,
      font: helveticaFont,
      color: fontColor,
    });
    page.drawText(data.instructorName, {
      x:
        (data.positions.instructorName.x || 348) -
        (data.positions.instructorName.center
          ? calcTextWidth(data.instructorName, fontSize)
          : 0),
      y: data.positions.instructorName.y || 665,
      size: fontSize,
      color: fontColor,
      font: helveticaFont,
    });
    page.drawText(data.instructorId, {
      x:
        (data.positions.instructorId.x || 348) -
        (data.positions.instructorId.center
          ? calcTextWidth(data.instructorId, fontSize)
          : 0),
      y: data.positions.instructorId.y || 652,
      size: fontSize,
      color: fontColor,
      font: helveticaFont,
    });
    page.drawText(this.formatDate(data.issued), {
      x:
        (data.positions.issued.x || 59) -
        (data.positions.issued.center
          ? calcTextWidth(data.issued, fontSize)
          : 0),
      y: data.positions.issued.y || 660,
      size: data.positions.issued.fontSize || fontSize,
      color: fontColor,
      font: helveticaFont,
    });

    page.drawText(this.formatDate(data.expires, true), {
      x:
        (data.positions.expires.x + 5 || 118) -
        (data.positions.expires.center
          ? calcTextWidth(data.expires, fontSize)
          : 0),
      y: data.positions.expires.y || 660,
      size: data.positions.expires.fontSize || fontSize,
      color: fontColor,
      font: helveticaFont,
    });
    page.drawText(data.eCardCode, {
      x:
        (data.positions.eCardCode.x || 175) -
        (data.positions.eCardCode.center
          ? calcTextWidth(data.eCardCode, fontSize)
          : 0),
      y: data.positions.eCardCode.y || 660,
      size: data.positions.eCardCode.fontSize || fontSize,
      color: fontColor,
      font: helveticaFont,
    });

    // Generate QR code
    // console.log(toDataURL);
    const qrCodeUrl = await toDataURL(
      process.env.BASE_URL + '/certificates/verify/' + data.eCardCode,
    );

    // Extract the base64 part of the QR code URL
    const qrImageBytes = qrCodeUrl.split(',')[1];
    const qrImageBuffer = Buffer.from(qrImageBytes, 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBuffer);

    // Get the dimensions of the QR code image
    const qrWidth = data.positions.qrCode.w || 60;
    const qrHeight = data.positions.qrCode.h || 60;

    // Draw the QR code image on the page
    page.drawImage(qrImage, {
      x: data.positions.qrCode.x || 233,
      y: data.positions.qrCode.y || 635,
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
