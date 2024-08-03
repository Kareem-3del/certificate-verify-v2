import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('login')
  @Render('login')
  getCertificate() {
    return { redirect: '/' };
  }
}
