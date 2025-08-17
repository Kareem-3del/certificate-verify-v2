import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from './referral.entity';
import { Certificate } from '../certificates/certificate.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async trackReferral(referralData: {
    source?: string;
    medium?: string;
    campaign?: string;
    referrer_url?: string;
    landing_page?: string;
    user_agent?: string;
    ip_address?: string;
    session_id?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  }) {
    const referral = this.referralRepository.create({
      source: this.parseSource(
        referralData.referrer_url,
        referralData.utm_source,
      ),
      medium: referralData.medium || referralData.utm_medium,
      campaign: referralData.campaign || referralData.utm_campaign,
      referrer_url: referralData.referrer_url,
      landing_page: referralData.landing_page,
      user_agent: referralData.user_agent,
      ip_address: referralData.ip_address,
      session_id: referralData.session_id,
      utm_source: referralData.utm_source,
      utm_medium: referralData.utm_medium,
      utm_campaign: referralData.utm_campaign,
      utm_term: referralData.utm_term,
      utm_content: referralData.utm_content,
    });

    return await this.referralRepository.save(referral);
  }

  private parseSource(referrerUrl?: string, utmSource?: string): string {
    if (utmSource) return utmSource;

    if (!referrerUrl) return 'direct';

    try {
      const url = new URL(referrerUrl);
      const hostname = url.hostname.toLowerCase();

      // Social Media Sources
      if (hostname.includes('facebook.com') || hostname.includes('fb.com'))
        return 'facebook';
      if (hostname.includes('twitter.com') || hostname.includes('t.co'))
        return 'twitter';
      if (hostname.includes('instagram.com')) return 'instagram';
      if (hostname.includes('linkedin.com')) return 'linkedin';
      if (hostname.includes('youtube.com')) return 'youtube';
      if (hostname.includes('tiktok.com')) return 'tiktok';
      if (hostname.includes('pinterest.com')) return 'pinterest';
      if (hostname.includes('reddit.com')) return 'reddit';

      // Search Engines
      if (hostname.includes('google.com') || hostname.includes('google.'))
        return 'google';
      if (hostname.includes('bing.com')) return 'bing';
      if (hostname.includes('yahoo.com')) return 'yahoo';
      if (hostname.includes('duckduckgo.com')) return 'duckduckgo';
      if (hostname.includes('baidu.com')) return 'baidu';

      // Other common sources
      if (hostname.includes('github.com')) return 'github';
      if (hostname.includes('stackoverflow.com')) return 'stackoverflow';

      return hostname;
    } catch (error) {
      return 'unknown';
    }
  }

  async getReferralAnalytics(days: number = 30) {
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Top referral sources
    const topSources = await this.referralRepository
      .createQueryBuilder('referral')
      .select('referral.source', 'source')
      .addSelect('COUNT(*)', 'visits')
      .addSelect(
        'SUM(CASE WHEN referral.converted = true THEN 1 ELSE 0 END)',
        'conversions',
      )
      .addSelect(
        'SUM(CASE WHEN referral.converted = true THEN referral.conversion_value ELSE 0 END)',
        'revenue',
      )
      .where('referral.created_at >= :fromDate', { fromDate })
      .groupBy('referral.source')
      .orderBy('COUNT(*)', 'DESC')
      .limit(10)
      .getRawMany();

    // Traffic by medium
    const trafficByMedium = await this.referralRepository
      .createQueryBuilder('referral')
      .select('COALESCE(referral.medium, "direct")', 'medium')
      .addSelect('COUNT(*)', 'visits')
      .where('referral.created_at >= :fromDate', { fromDate })
      .groupBy('referral.medium')
      .orderBy('COUNT(*)', 'DESC')
      .getRawMany();

    // Daily traffic trend
    const dailyTraffic = await this.referralRepository
      .createQueryBuilder('referral')
      .select('DATE(referral.created_at)', 'date')
      .addSelect('COUNT(*)', 'visits')
      .addSelect('COUNT(DISTINCT referral.session_id)', 'unique_visitors')
      .where('referral.created_at >= :fromDate', { fromDate })
      .groupBy('DATE(referral.created_at)')
      .orderBy('DATE(referral.created_at)', 'ASC')
      .getRawMany();

    // Geographic data
    const topCountries = await this.referralRepository
      .createQueryBuilder('referral')
      .select('COALESCE(referral.country, "Unknown")', 'country')
      .addSelect('COUNT(*)', 'visits')
      .where('referral.created_at >= :fromDate', { fromDate })
      .groupBy('referral.country')
      .orderBy('COUNT(*)', 'DESC')
      .limit(10)
      .getRawMany();

    // Conversion rates by source
    const conversionRates = await this.referralRepository
      .createQueryBuilder('referral')
      .select('referral.source', 'source')
      .addSelect('COUNT(*)', 'total_visits')
      .addSelect(
        'SUM(CASE WHEN referral.converted = true THEN 1 ELSE 0 END)',
        'conversions',
      )
      .addSelect(
        'ROUND((SUM(CASE WHEN referral.converted = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2)',
        'conversion_rate',
      )
      .where('referral.created_at >= :fromDate', { fromDate })
      .groupBy('referral.source')
      .having('COUNT(*) >= 5') // Only sources with at least 5 visits
      .orderBy('conversion_rate', 'DESC')
      .getRawMany();

    return {
      topSources: topSources.map((item) => ({
        source: item.source,
        visits: parseInt(item.visits),
        conversions: parseInt(item.conversions),
        revenue: parseFloat(item.revenue) || 0,
        conversionRate:
          item.visits > 0
            ? ((item.conversions / item.visits) * 100).toFixed(2)
            : '0.00',
      })),
      trafficByMedium: trafficByMedium.map((item) => ({
        medium: item.medium || 'direct',
        visits: parseInt(item.visits),
      })),
      dailyTraffic: dailyTraffic.map((item) => ({
        date: item.date,
        visits: parseInt(item.visits),
        uniqueVisitors: parseInt(item.unique_visitors),
      })),
      topCountries: topCountries.map((item) => ({
        country: item.country,
        visits: parseInt(item.visits),
      })),
      conversionRates: conversionRates.map((item) => ({
        source: item.source,
        totalVisits: parseInt(item.total_visits),
        conversions: parseInt(item.conversions),
        conversionRate: parseFloat(item.conversion_rate),
      })),
    };
  }

  async markConversion(sessionId: string, conversionValue: number) {
    await this.referralRepository.update(
      { session_id: sessionId },
      {
        converted: true,
        conversion_value: conversionValue,
      },
    );
  }

  async getTotalTrafficStats(days: number = 30) {
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const stats = await this.referralRepository
      .createQueryBuilder('referral')
      .select('COUNT(*)', 'totalVisits')
      .addSelect('COUNT(DISTINCT referral.session_id)', 'uniqueVisitors')
      .addSelect(
        'SUM(CASE WHEN referral.converted = true THEN 1 ELSE 0 END)',
        'totalConversions',
      )
      .addSelect(
        'SUM(CASE WHEN referral.converted = true THEN referral.conversion_value ELSE 0 END)',
        'totalRevenue',
      )
      .where('referral.created_at >= :fromDate', { fromDate })
      .getRawOne();

    return {
      totalVisits: parseInt(stats.totalVisits) || 0,
      uniqueVisitors: parseInt(stats.uniqueVisitors) || 0,
      totalConversions: parseInt(stats.totalConversions) || 0,
      totalRevenue: parseFloat(stats.totalRevenue) || 0,
      conversionRate:
        stats.totalVisits > 0
          ? ((stats.totalConversions / stats.totalVisits) * 100).toFixed(2)
          : '0.00',
    };
  }
}
