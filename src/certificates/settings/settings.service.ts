// settings.service.ts

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';

@Injectable()
export class SettingsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async onApplicationBootstrap() {
    const templates = Array.from({ length: 9 }, (_, index) => ({
      name: `TEMPLATE ${index + 1}`,
      id: index + 1,
      instructorName: '',
      instructorId: '',
      trainingCenterName: '',
      trainingCenterId: '',
      tcCity: '',
      trainingSiteName: '',
    }));

    for (const template of templates) {
      const existing = await this.findOne(template.id);
      if (!existing) {
        await this.create(template);
        console.log(`SETTINGS CREATED: `, template);
      }
    }
  }

  findAll(): Promise<Settings[]> {
    return this.settingsRepository.find();
  }

  findOne(id: number): Promise<Settings> {
    return this.settingsRepository.findOneBy({ id });
  }

  create(settings: Settings): Promise<Settings> {
    return this.settingsRepository.save(settings);
  }

  async update(id: number, settings: Settings): Promise<Settings> {
    await this.settingsRepository.update(id, settings);
    return this.findOne(id);
  }
}
