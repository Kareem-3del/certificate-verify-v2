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

import { CertificatesService } from './certificates.service';
import { toDataURL } from 'qrcode';
import process from 'node:process';
import { EmailService } from '../email/email.service';
import { SettingsService } from './settings/settings.service';
import { Certificate } from './certificate.entity';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AnalyticsService } from '../analytics/analytics.service';

@Controller('')
export class AppController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly certificatesService: CertificatesService,
    private usersService: UsersService,
  ) {}

  @Get()
  async getHello(@Session() session: any, @Res() res: Response) {
    const settings = await this.settingsService.findAll();
    if (session.user) {
      res.render('index', {
        settings,
        user: await this.usersService.findById(session.user.id),
      });
    }
    res.redirect('/login');
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

  @Post('/certificate-verify/:id')
  @Render('certificate-overview') // Renders verify.ejs
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
}

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly certificatesService: CertificatesService,
    private readonly emailService: EmailService,
    private readonly settingsService: SettingsService,
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get('analysis')
  async getCertificateAnalysis(@Query('days') days: string) {
    const daysAgo = parseInt(days, 10); // Convert days to an integer
    const fromDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000); // Subtract days from the current date

    const [
      totalCertificates,
      recentCertificates,
      rateOfSameUserGetMoreCertificates,
      rateOfCertificatesByType,
    ] = await Promise.all([
      this.certificatesService.totalCertificates(fromDate),
      this.certificatesService.recentCertificates(fromDate),
      this.certificatesService.rateOfSameUserGetMoreCertificates(),
      this.certificatesService.rateOfCertificatesByType(),
    ]);
    const analysis = await this.usersService.getUserAnalysis(daysAgo);
    return {
      totalCertificates,
      recentCertificates,
      rateOfSameUserGetMoreCertificates,
      rateOfCertificatesByType,
      ...analysis,
    };
  }

  @Get('analytics/dashboard')
  async getAnalyticsDashboard(@Query('dateRange') dateRange: string = '30') {
    const days = parseInt(dateRange, 10);
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    try {
      const [
        totalCertificates,
        recentCertificates,
        certificatesByType,
        dailyIssuanceData,
        expiringCertificates,
        userAnalytics,
        revenueData,
        referralAnalytics,
        trafficStats,
      ] = await Promise.all([
        this.certificatesService.totalCertificates(fromDate),
        this.certificatesService.recentCertificates(fromDate),
        this.certificatesService.rateOfCertificatesByType(),
        this.certificatesService.getDailyIssuanceData(days),
        this.certificatesService.getExpiringCertificates(30),
        this.usersService.getUserAnalysis(days),
        this.certificatesService.getRevenueAnalytics(days),
        this.analyticsService.getReferralAnalytics(days),
        this.analyticsService.getTotalTrafficStats(days),
      ]);

      return {
        success: true,
        data: {
          overview: {
            totalCertificates: totalCertificates.count,
            activeUsers: userAnalytics.totalUsers,
            expiringSoon: expiringCertificates.length,
            totalRevenue: revenueData.total,
            totalVisits: trafficStats.totalVisits,
            uniqueVisitors: trafficStats.uniqueVisitors,
            conversionRate: trafficStats.conversionRate,
            growthMetrics: {
              certificatesGrowth: this.calculateGrowthRate(
                totalCertificates.previousCount,
                totalCertificates.count,
              ),
              usersGrowth: this.calculateGrowthRate(
                userAnalytics.previousUsers,
                userAnalytics.totalUsers,
              ),
              revenueGrowth: this.calculateGrowthRate(
                revenueData.previousTotal,
                revenueData.total,
              ),
            },
          },
          certificateTypes: certificatesByType,
          issuanceTrend: dailyIssuanceData,
          expiringCertificates,
          recentActivity: recentCertificates.slice(0, 10),
          systemHealth: await this.getSystemHealth(),
          referralAnalytics: {
            topSources: referralAnalytics.topSources,
            trafficByMedium: referralAnalytics.trafficByMedium,
            dailyTraffic: referralAnalytics.dailyTraffic,
            topCountries: referralAnalytics.topCountries,
            conversionRates: referralAnalytics.conversionRates,
          },
          trafficStats,
        },
      };
    } catch (error) {
      console.error('Error fetching analytics dashboard:', error);
      return {
        success: false,
        error: 'Failed to fetch analytics data',
      };
    }
  }

  @Get('analytics/revenue')
  async getRevenueAnalytics(@Query('days') days: string = '30') {
    const daysAgo = parseInt(days, 10);
    try {
      const revenueData =
        await this.certificatesService.getRevenueAnalytics(daysAgo);
      return {
        success: true,
        data: revenueData,
      };
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      return {
        success: false,
        error: 'Failed to fetch revenue data',
      };
    }
  }

  @Get('analytics/certificates/trend')
  async getCertificateTrend(@Query('days') days: string = '30') {
    const daysAgo = parseInt(days, 10);
    try {
      const trendData =
        await this.certificatesService.getDailyIssuanceData(daysAgo);
      return {
        success: true,
        data: trendData,
      };
    } catch (error) {
      console.error('Error fetching certificate trend:', error);
      return {
        success: false,
        error: 'Failed to fetch trend data',
      };
    }
  }

  @Get('analytics/users')
  async getUserAnalytics(@Query('days') days: string = '30') {
    const daysAgo = parseInt(days, 10);
    try {
      const userAnalytics = await this.usersService.getUserAnalysis(daysAgo);
      return {
        success: true,
        data: userAnalytics,
      };
    } catch (error) {
      console.error('Error fetching user analytics:', error);
      return {
        success: false,
        error: 'Failed to fetch user analytics',
      };
    }
  }

  @Post('send-bulk-enhanced')
  async sendEnhancedBulkEmail(@Body() emailData: any) {
    try {
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

      // Process email campaign
      const results = await this.emailService.sendEnhancedBulkEmail({
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
      });

      return {
        success: true,
        ...results,
        campaignId: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error sending enhanced bulk email:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  private calculateGrowthRate(previous: number, current: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  private async getSystemHealth() {
    // Simple system health check
    return {
      database: { status: 'healthy', responseTime: '45ms' },
      emailService: { status: 'healthy', queueSize: 2 },
      storage: { status: 'healthy', usage: '2.3GB / 50GB' },
      pdfGenerator: { status: 'warning', load: '78%' },
    };
  }

  @Post('send-bulk')
  async sendBulkEmail(
    @Res() res: Response,
    @Body('recipients') recipients: string[],
    @Body('name') name: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('resultEmail') resultEmail: string,
    @Body('attachments')
    attachments?: {
      filename: string;
      content: string;
      contentType: string;
    }[],
  ) {
    try {
      const results = await this.emailService.sendBulkEmail(
        recipients,
        name,
        subject,
        text,
        resultEmail,
        attachments, // Pass attachments to the service method
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
  async generate(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.user) {
      res.redirect('/login');
    }
    const user = await this.usersService.findById(session.user.id);
    if (!id) throw new Error('No ID provided');
    const settings = await this.settingsService.findOne(Number(id));
    const settingsIds = user.subscriptions.map((sub) => sub.configId);
    if (settingsIds.indexOf(settings.id) === -1 && user.role === 'customer') {
      res.redirect('/');
    }
    res.render('generate_v2', {
      settings,
      user,
    });
  }

  @Post('generate')
  @Render('certificate') // Renders generate.ejs
  async generateCertificate(
    @Body() body: { name: string; email: string; index: number },
    @Session() session: Record<string, any>,
  ) {
    if (!session.user) {
      throw new BadRequestException('No user found');
    }
    const user = await this.usersService.findById(session.user.id);
    if (!user) {
      throw new BadRequestException('No user found');
    }
    if (user.points < 1 && user.role === 'customer') {
      throw new BadRequestException('Not enough points');
    }
    const certificate = await this.certificatesService.createCertificate(
      body.name,
      body.email,
      Number(body.index),
      {
        instructorId: user.instructor_id || undefined,
        instructorName: user.instructor_name || undefined,
        trainingCenterName: user.center_name || undefined,
        trainingSiteName: user.center_name || undefined,
      },
    );
    await this.usersService.userRepository.update(user.id, {
      points: user.points - 1,
    });
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

  @Get('templates')
  async getCertificateTemplates() {
    try {
      // Return available certificate templates
      const templates = [
        {
          id: 1,
          name: 'Template 1',
          description: 'Professional Certificate',
          preview: '/templates/v1/template-1.png',
        },
        {
          id: 2,
          name: 'Template 2',
          description: 'Modern Certificate',
          preview: '/templates/v1/template-2.png',
        },
        {
          id: 3,
          name: 'Template 3',
          description: 'Classic Certificate',
          preview: '/templates/v1/template-3.png',
        },
        {
          id: 4,
          name: 'Template 4',
          description: 'Elegant Certificate',
          preview: '/templates/v1/template-4.png',
        },
        {
          id: 5,
          name: 'Template 5',
          description: 'Formal Certificate',
          preview: '/templates/v1/template-5.png',
        },
        {
          id: 6,
          name: 'Template 6',
          description: 'Creative Certificate',
          preview: '/templates/v1/template-6.png',
        },
        {
          id: 7,
          name: 'Template 7',
          description: 'Executive Certificate',
          preview: '/templates/v1/template-7.png',
        },
        {
          id: 8,
          name: 'Template 8',
          description: 'Custom Certificate',
          preview: '/templates/v1/custom.png',
        },
      ];
      return { success: true, data: templates };
    } catch (error) {
      return { success: false, error: 'Failed to load templates' };
    }
  }

  @Get('templates/:id')
  async getCertificateTemplate(@Param('id') id: string) {
    try {
      const templateId = parseInt(id, 10);
      // Return specific template details
      const template = {
        id: templateId,
        name: `Template ${templateId}`,
        description: `Certificate Template ${templateId}`,
        preview: `/templates/v1/template-${templateId}.png`,
        settings: {
          // Add template-specific settings here
        },
      };
      return { success: true, data: template };
    } catch (error) {
      return { success: false, error: 'Failed to load template' };
    }
  }

  @Get('emails')
  async getCertificateEmails(@Query('type') type?: string) {
    try {
      // Get all certificates with email addresses
      const certificates =
        await this.certificatesService.getFilteredCertificates({
          hasEmail: true,
          type: type,
        });

      const emails = certificates.map((cert) => ({
        id: cert.id,
        email: cert.email,
        name: cert.name,
        certificateId: cert.id, // Using id as certificateId
        type: cert.type,
        issuedAt: cert.issued, // Fixed property name
        status: 'sent', // You can track email status
      }));

      return { success: true, data: emails };
    } catch (error) {
      console.error('Error fetching emails:', error);
      return { success: false, error: 'Failed to load emails' };
    }
  }

  @Post('emails/filter')
  async getFilteredEmails(@Body() filterCriteria: any) {
    try {
      // Apply filters to get specific email addresses
      const certificates =
        await this.certificatesService.getFilteredCertificates(filterCriteria);

      const filteredEmails = certificates
        .filter((cert) => cert.email)
        .map((cert) => ({
          id: cert.id,
          email: cert.email,
          name: cert.name,
          certificateId: cert.id, // Using id as certificateId
          type: cert.type,
          issuedAt: cert.issued, // Fixed property name
        }));

      return { success: true, data: filteredEmails };
    } catch (error) {
      console.error('Error filtering emails:', error);
      return { success: false, error: 'Failed to filter emails' };
    }
  }
}
