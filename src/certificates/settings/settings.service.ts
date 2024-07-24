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
          name: 'TEMPLATE 1',
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

        this.create({
          name: 'TEMPLATE 2',
          id: 2,
          instructorName: '',
          instructorId: '',
          trainingCenterName: '',
          trainingCenterId: '',
          tcCity: '',
          trainingSiteName: '',
        }).then((value) => {
          console.log('SETTINGS ARE CREATED', value);
        });

        this.create({
          name: 'TEMPLATE 3',
          id: 3,
          instructorName: '',
          instructorId: '',
          trainingCenterName: '',
          trainingCenterId: '',
          tcCity: '',
          trainingSiteName: '',
        }).then((value) => {
          console.log('SETTINGS ARE CREATED', value);
        });

        this.create({
          name: 'TEMPLATE 4',
          id: 4,
          instructorName: '',
          instructorId: '',
          trainingCenterName: '',
          trainingCenterId: '',
          tcCity: '',
          trainingSiteName: '',
        }).then((value) => {
          console.log('SETTINGS ARE CREATED', value);
        });

        this.create({
          name: 'TEMPLATE 5',
          id: 5,
          instructorName: '',
          instructorId: '',
          trainingCenterName: '',
          trainingCenterId: '',
          tcCity: '',
          trainingSiteName: '',
        }).then((value) => {
          console.log('SETTINGS ARE CREATED', value);
        });
        this.create({
          name: 'TEMPLATE 6',
          id: 6,
          instructorName: '',
          instructorId: '',
          trainingCenterName: '',
          trainingCenterId: '',
          tcCity: '',
          trainingSiteName: '',
        }).then((value) => {
          console.log('SETTINGS ARE CREATED', value);
        });
        this.create({
          name: 'TEMPLATE 7',
          id: 7,
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
