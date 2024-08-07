import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
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
    @Session() session: Record<string, any>,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      return response.render('login', {
        error: 'password or username incorrect',
      });
    }
    session.user = user;
    session.connected = true;
    const token = await this.authService.login(user);
    response.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(token),
    );
    response.redirect('/');
  }

  @Get('/logout')
  @Redirect('/login')
  postLogout(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      console.log(err);
    });
  }

  @Get('login')
  login_(@Res() res: ExpressResponse) {
    res.render('login', { error: '' });
  }

  @Get('forgot-password')
  forgotPassword(@Res() res: ExpressResponse) {
    res.render('forgot-password', { error: '', success: '' });
  }

  @Render('forgot-password')
  @Post('forgot-password')
  async forgotPassword_(
    @Body('username') email: string,
    @Res() res: ExpressResponse,
  ) {
    try {
      const user = await this.authService.usersService.findByUsername(email);
      console.log(user, email);
      if (!user) {
        return res.render('forgot-password', {
          error: 'User with this email not found',
          success: '',
        });
      }
      // if user.username is not email pattern throw error
      if (!/^.+@.+\..+$/.test(user.username)) {
        return res.render('forgot-password', {
          error: 'Invalid email',
          success: '',
        });
      }
      const status = await this.authService.sendPassword(user);
      if (!status) {
        return res.render('forgot-password', {
          error: "Couldn't send email Contact Us",
          success: '',
        });
      }
      res.render('forgot-password', {
        error: '',
        success: `Password has been sent to your email. ${status}`,
      });
    } catch (e) {
      console.error(e);
      res.render('forgot-password', {
        error: 'An error occurred',
        success: '',
      });
    }
  }
}
@Controller('')
export class LoginController {
  @Get('login')
  login(@Res() res: ExpressResponse) {
    console.log('login page');
    try {
      res.render('login', { error: '' });
    } catch (e) {
      console.log(e);
    }
  }
}
