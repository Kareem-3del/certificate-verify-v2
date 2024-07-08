// settings.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Redirect,
  Session,
  Res,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.entity';
import { User } from '../../users/user.entity';
import { Response } from 'express';
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async showSettings(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const currentUser: User = session.user;
    if (!currentUser) {
      res.redirect('/login');
    }
    const settings = await this.settingsService.findOne(1);
    if (currentUser.role !== 'admin') {
      console.log(currentUser.role);
      res.render('settings/mod', { settings });
    }
    return res.render('settings/index', { settings });
  }

  @Redirect('/settings')
  @Post()
  async updateSettings(@Body() settings: Settings): Promise<void> {
    await this.settingsService.update(1, settings);
  }
}
