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
  HttpException,
  HttpStatus,
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
      return res.redirect('/login');
    }

    try {
      const settings = await this.settingsService.findAll();
      switch (currentUser.role) {
        case 'moderator':
          return res.render('settings/mod', { settings });
        case 'admin':
          return res.render('settings/index', { settings });
        case 'customer':
          return res.render('index', { settings });
        default:
          throw new HttpException('Unauthorized role', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error retrieving settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/sub')
  async showSettingsSub(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const currentUser: User = session.user;
    if (!currentUser) {
      throw new HttpException('No user found', HttpStatus.UNAUTHORIZED);
    }

    try {
      const settings = await this.settingsService.findAll();
      if (currentUser.role === 'admin') {
        return res.render('settings/sub', { settings });
      } else {
        throw new HttpException('Unauthorized role', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error retrieving settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/json')
  async getSettings(): Promise<Settings[]> {
    try {
      return await this.settingsService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error retrieving settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Redirect('/settings')
  @Post(':id')
  async updateSettings(
    @Body() settings: Settings,
    @Param('id') id: string,
  ): Promise<void> {
    if (!id) {
      throw new HttpException('No ID provided', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.settingsService.update(Number(id), settings);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error updating settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
