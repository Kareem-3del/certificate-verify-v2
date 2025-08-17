import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Referral } from './referral.entity';
import { Certificate } from '../certificates/certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Referral, Certificate])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
