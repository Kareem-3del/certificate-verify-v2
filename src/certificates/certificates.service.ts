import * as path from 'path';
import { Parser } from 'json2csv';

const Template_1: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-1.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 1,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      y: 305,
      fontSize: 12,

      center: true,
    },
  },
};
const Template_2: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-2.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 2,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      y: 305,
      fontSize: 12,
      center: true,
    },
  },
};
const Template_3: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-3.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 3,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
const Template_4: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-4.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 4,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
const Template_5: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-5.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 5,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 24,
    fullName: {
      x: 150,
      y: 940,
      scale: 2.0,
      center: false,
    },
    issued: {
      x: 350,
      y: 852,
    },
    expires: {
      x: 346,
      y: 822,
    },
    eCardCode: {
      x: 350,
      y: 794,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 350,
      y: 764,
    },
    instructorId: {
      x: 350,
      y: 880,
    },

    qrCode: {
      x: 700 - 25,
      y: 800 - 25,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
const Template_6: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-6.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 6,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 24,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 350,
      y: 852,
    },
    expires: {
      x: 346,
      y: 822,
    },
    eCardCode: {
      x: 350,
      y: 794,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 350,
      y: 764,
    },
    instructorId: {
      x: 350,
      y: 880,
    },

    qrCode: {
      x: 700 - 25,
      y: 800 - 25,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      fontSize: 12,
      y: 305,
      center: true,
    },
  },
};
const Template_7: TemplateData = {
  image_cert: path.resolve('./views/templates/v2/template-7.jpg'),
  image_id: path.resolve('./views/templates/v2/card.jpg'),
  settings: 7,

  id_card: {
    fontSize: 18,
    fullName: {
      x: 590,
      y: 390,
      scale: 2.0,
      center: true,
    },
    issued: {
      x: 380 + 70,
      y: 200,
      i: true,
    },
    expires: {
      x: 600 + 150,
      y: 200,
      i: true,
    },
    instructorId: {
      x: 34008,
      y: 4489,
    },
    name: {
      x: 585,
      y: 275,
      scale: 1.8,
      center: true,
    },
    instructorName: {
      x: 34008,
      y: 665,
    },
    TrainingCenterName: {
      x: 30408,
      y: 745,
    },
    TrainingCenterId: {
      x: 34008,
      y: 725,
    },
    eCardCode: {
      x: 110404,
      y: 1848,
    },
    city: {
      x: 340008,
      y: 705,
    },
    training_site_name: {
      x: 50,
      fontSize: 12,
      y: 240,
    },
    qrCode: {
      x: 905,
      y: 45,
      w: 200,
      h: 200,
    },
  },
  cert_card: {
    fontSize: 15,
    fullName: {
      x: 150,
      y: 930,
      scale: 1.9,
      center: false,
    },
    issued: {
      x: 275,
      y: 876,
    },
    expires: {
      x: 275,
      y: 856,
    },
    eCardCode: {
      x: 275,
      y: 836,
    },
    instructorName: {
      x: 220005,
      y: 816,
    },
    TrainingCenterName: {
      x: 275,
      y: 816,
    },
    instructorId: {
      x: 275,
      y: 896,
    },

    qrCode: {
      x: 700 - 20,
      y: 800 - 20,
      w: 150,
      h: 150,
    },

    TrainingCenterId: {
      x: 16005,
      y: 385,
      center: true,
    },
    city: {
      x: 16005,
      y: 345,
      center: true,
    },
    training_site_name: {
      x: 16005,
      y: 305,
      fontSize: 12,

      center: true,
    },
  },
};

// certificates.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import { toDataURL } from 'qrcode';
import fontkit from '@pdf-lib/fontkit';
import * as process from 'node:process';
import { SettingsService } from './settings/settings.service';
import { EmailService } from '../email/email.service';
import { Settings } from './settings/settings.entity';

interface TemplatePosition {
  fontSize: number;
  fullName: {
    x: number;
    y: number;
    center?: boolean;
    scale?: number;
  };
  name?: {
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
    i?: boolean;
  };
  expires: {
    x: number;
    y: number;
    center?: boolean;
    fontSize?: number;
    i?: boolean;
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
    fontSize: number;
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

  async totalCertificates(fromDate: Date) {
    return this.certificateRepository.count({
      where: {
        // created_at: MoreThan(fromDate),
      },
    });
  }

  async recentCertificatesByDay(fromDate: Date) {
    return this.certificateRepository
      .createQueryBuilder('certificate')
      .select('DATE(created_at) as day')
      .addSelect('COUNT(*) as count')
      .where('created_at > :fromDate', { fromDate })
      .groupBy('DATE(created_at)')
      .orderBy('DATE(created_at)', 'ASC')
      .getRawMany();
  }

  async totalCertificatesByMonth() {
    return this.certificateRepository
      .createQueryBuilder('certificate')
      .select("DATE_TRUNC('month', created_at) as month")
      .addSelect('COUNT(*) as count')
      .groupBy("DATE_TRUNC('month', created_at)")
      .orderBy("DATE_TRUNC('month', created_at)", 'ASC')
      .getRawMany();
  }

  async recentCertificates(fromDate: Date) {
    return this.certificateRepository.find({
      order: {
        created_at: 'DESC',
      },
      take: 10,
    });
  }

  rateOfSameUserGetMoreCertificates() {
    return this.certificateRepository
      .createQueryBuilder('certificate')
      .select('email')
      .addSelect('COUNT(email) as count')
      .groupBy('email')
      .having('COUNT(email) > 1')
      .getRawMany();
  }

  async usersWithMoreCertificatesByType() {
    return this.certificateRepository
      .createQueryBuilder('certificate')
      .select('email')
      .addSelect('type')
      .addSelect('COUNT(*) as count')
      .groupBy('email, type')
      .having('COUNT(*) > 1')
      .getRawMany();
  }

  rateOfCertificatesByType() {
    return this.certificateRepository
      .createQueryBuilder('certificate')
      .select('type')
      .addSelect('COUNT(type) as count')
      .groupBy('type')
      .getRawMany();
  }

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
    settings_?: Partial<Settings>,
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
      ][templateIndex - 1];
      if (!template) {
        console.log('Template not found', templateIndex);
        throw new NotFoundException('Template not found');
      }
      const certificate = new Certificate();
      const settings = await this.settingsService.findOne(template.settings);
      // for every value in settings_ if it is not null, set it in settings check if it is not null
      for (const key in settings_) {
        if (settings_[key]) {
          settings[key] = settings_[key];
        }
      }
      // make id is long integer with 10 digits at least & some letters should be unique
      certificate.id = this.generateUniqueNumericID();
      certificate.instructor_id = settings.instructorId;

      if (templateIndex === 8) {
        certificate.instructor_id =
          certificate.instructor_id + this.generateUniqueNumericID();
        certificate.id = this.generateRandomId(22);
      }

      certificate.name = name;
      certificate.issued = new Date();
      certificate.email = email;
      certificate.express = new Date(
        Date.now() + 2 * 365 * 24 * 60 * 60 * 1000,
      );
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
      settings.emailBody = settings.emailBody.replaceAll('[NAME]', name);
      settings.emailBody = settings.emailBody.replaceAll(
        '[CERTIFICATE_ID]',
        certificate.id,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[TYPE]',
        settings.name,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[ISSUED]',
        certificate.issued.toDateString(),
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[EXPIRES]',
        certificate.express.toDateString(),
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[INSTRUCTOR_ID]',
        certificate.instructor_id,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[INSTRUCTOR_NAME]',
        certificate.instructor_name,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[TRAINING_CENTER_NAME]',
        certificate.training_center_name,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[TRAINING_CENTER_ID]',
        certificate.training_center_id,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[CITY]',
        settings.tcCity,
      );
      settings.emailBody = settings.emailBody.replaceAll(
        '[TRAINING_SITE_NAME]',
        settings.trainingSiteName,
      );
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

  generateRandomId(length: number): string {
    const numbers = '0123456789';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    // Ensure the length is a multiple of 4 to maintain the pattern
    const patternLength = Math.floor(length / 4) * 4;

    for (let i = 0; i < patternLength; i++) {
      if (i % 4 === 0) {
        // Use numbers for the first position of each 4-position block
        const randomIndex = Math.floor(Math.random() * numbers.length);
        result += numbers[randomIndex];
      } else {
        // Use characters for the next three positions of each 4-position block
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
    }

    return result;
  }

  async deleteCertificate(id: string): Promise<void> {
    const certificate = await this.certificateRepository.findOneBy({ id });
    if (!certificate) {
      throw new NotFoundException();
    }

    // delete
    console.log(certificate);
    if (
      certificate.certificate_path &&
      fs.existsSync(certificate.certificate_path)
    )
      fs.unlinkSync(certificate.certificate_path);
    if (certificate.id_path && fs.existsSync(certificate.id_path))
      fs.unlinkSync(certificate.id_path);
    if (certificate.id_path && fs.existsSync(certificate.id_and_cert_path))
      fs.unlinkSync(certificate.id_and_cert_path);
    await this.certificateRepository.delete({ id });
  }

  async renewCertificate(id: string): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOneBy({ id });
    certificate.express = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000);
    return this.certificateRepository.save(certificate);
  }
}
