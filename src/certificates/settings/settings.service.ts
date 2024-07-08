// settings.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {
    // check if config is set or not else create one with emtry strings
    this.findOne(1).then((data) => {
      if (!data) {
        this.create({
          id: 1,
          instructorName: '',
          instructorId: '',
          trainingCenterName: '',
          trainingCenterId: '',
          tcCity: '',
          trainingSiteName: '',
        }).then((value) => {
          console.log('SETTINGS ARE CREATED', value);
        });
      }
    });
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
