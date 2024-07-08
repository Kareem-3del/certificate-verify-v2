import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { SettingsService } from './settings/settings.service';
import { SettingsController } from './settings/settings.controller';
import { Settings } from './settings/settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate, Settings])],
  providers: [CertificatesService, SettingsService],
  controllers: [CertificatesController, SettingsController],
})
export class CertificatesModule {}
