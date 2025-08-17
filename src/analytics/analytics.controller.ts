import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async trackVisit(@Body() trackingData: any, @Req() req: Request) {
    const userAgent = req.headers['user-agent'];
    const ip = req.ip || req.connection.remoteAddress;

    const referralData = {
      source: trackingData.source,
      medium: trackingData.medium,
      campaign: trackingData.campaign,
      referrer_url: trackingData.referrer,
      landing_page: trackingData.landing_page,
      user_agent: userAgent,
      ip_address: ip,
      session_id: trackingData.session_id,
      utm_source: trackingData.utm_source,
      utm_medium: trackingData.utm_medium,
      utm_campaign: trackingData.utm_campaign,
      utm_term: trackingData.utm_term,
      utm_content: trackingData.utm_content,
    };

    const referral = await this.analyticsService.trackReferral(referralData);
    return { success: true, referralId: referral.id };
  }

  @Get('referrals')
  async getReferralAnalytics(@Query('days') days: string = '30') {
    const daysNumber = parseInt(days, 10);
    const analytics =
      await this.analyticsService.getReferralAnalytics(daysNumber);
    return { success: true, data: analytics };
  }

  @Get('traffic')
  async getTrafficStats(@Query('days') days: string = '30') {
    const daysNumber = parseInt(days, 10);
    const stats = await this.analyticsService.getTotalTrafficStats(daysNumber);
    return { success: true, data: stats };
  }

  @Post('conversion')
  async markConversion(
    @Body() conversionData: { sessionId: string; value: number },
  ) {
    await this.analyticsService.markConversion(
      conversionData.sessionId,
      conversionData.value,
    );
    return { success: true };
  }
}
