// settings.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Redirect,
  Session,
  Res,
  Param,
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
    const settings = await this.settingsService.findAll();
    if (currentUser.role !== 'admin') {
      console.log(currentUser.role);
      res.render('settings/mod', { settings });
    }
    console.log('admin');
    return res.render('settings/index', { settings });
  }

  @Redirect('/settings')
  @Post(':id')
  async updateSettings(
    @Body() settings: Settings,
    @Param('id') id: string,
  ): Promise<void> {
    if (!id) throw new Error('No ID provided');
    await this.settingsService.update(Number(id), settings);
  }
}
