import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import {
  AppController,
  CertificatesController,
} from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { SettingsService } from './settings/settings.service';
import { SettingsController } from './settings/settings.controller';
import { Settings } from './settings/settings.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate, Settings]), EmailModule],
  providers: [CertificatesService, SettingsService],
  controllers: [CertificatesController, SettingsController, AppController],
})
export class CertificatesModule {}
