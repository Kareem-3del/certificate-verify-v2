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
    if (currentUser.role === 'moderator') {
      res.render('settings/mod', { settings });
    }
    if (currentUser.role === 'admin') {
      return res.render('settings/index', { settings });
    }
    if (currentUser.role === 'customer') {
      return res.render('index', { settings });
    }
  }

  @Get('/sub')
  async showSettingsSub(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const currentUser: User = session.user;
    if (!currentUser) {
      throw new Error('No user found');
    }
    const settings = await this.settingsService.findAll();
    if (currentUser.role === 'admin') {
      console.log(currentUser.role);
      res.render('settings/sub', { settings });
    }
    throw new Error('No user found');
  }

  @Get('/json')
  async getSettings(): Promise<Settings[]> {
    return this.settingsService.findAll();
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
