// settings.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Redirect,
  UseGuards,
  Session,
  Res,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.entity';
import { AuthGuard } from '@nestjs/passport';
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
      res.redirect('/auth/login');
    }
    const settings = await this.settingsService.findOne(1);
    if (currentUser.role !== 'admin') {
      res.render('settings/mod');
    }
    return { settings };
  }

  @Redirect('/settings')
  @Post()
  async updateSettings(@Body() settings: Settings): Promise<void> {
    await this.settingsService.update(1, settings);
  }
}
