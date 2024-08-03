import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Res,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    loginDto: {
      username: string;
      password: string;
    },
    @Query('redirect') redirect: string,
    @Session() session: Record<string, any>,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      response.render('login', { message: 'password or username incorrect' });
    }
    session.user = user;
    session.connected = true;
    const token = await this.authService.login(user);
    response.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(token),
    );
    console.log(redirect);
    response.redirect(redirect || '/settings');
  }

  @Get('/logout')
  @Redirect('/login')
  postLogout(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      console.log(err);
    });
  }
}
