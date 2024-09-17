import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { Payid19Service } from './payid19.service';
import { ConfigService } from '@nestjs/config';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { User } from '../../users/user.entity';

@Controller('payid19')
export class Payid19Controller {
  constructor(
    private payid19Service: Payid19Service,
    private configService: ConfigService,
    private subscriptionService: SubscriptionsService,
  ) {}

  @Post('create-payment-link')
  async createPaymentLink(@Req() req: Request, @Res() res: Response) {
    const {
      userId,
      subId,
      instructor_id,
      instructor_name,
      center_name,
      email,
    } = req.body;
    const sub = await this.subscriptionService.findOne(subId);

    // Create a payment link
    const url = await this.payid19Service.createInvoice(
      sub.price,
      sub.id.toString(),
      userId,
      sub.name,
      `Subscription for ${sub.name} with ${instructor_name} at ${center_name}`,
      {
        email,
        userId,
        subId,
        instructor_id,
        instructor_name,
        center_name,
      },
    );

    return res.send({ url });
  }

  @Get('payment-success/')
  async handlePaymentSuccess(
    @Query('metadata') metadata: any,
    @Res() res: Response,
  ) {
    try {
      console.log(metadata);
      // eslint-disable-next-line prefer-const
      let { email, instructor_id, instructor_name, center_name, subId } =
        JSON.parse(metadata);
      console.log(metadata);
      const sub = await this.subscriptionService.findOne(+subId);

      if (!email) throw new Error('Email not found in session');
      if (!subId) throw new Error('Subscription ID not found in session');
      let password: string = Math.random().toString(36).slice(-8);

      let user: User =
        await this.subscriptionService.usersService.findByUsername(email);
      if (!user) {
        user = await this.subscriptionService.usersService.create(
          email,
          password,
        );
      } else {
        password = 'Check your email';
      }
      if (!user) {
        throw new Error('Failed to create or get user contact support');
      }

      if (!sub.instructor_id) {
        instructor_id = null;
      }

      if (!sub.instructor_name) {
        instructor_name = null;
      }
      if (!sub.center_name) {
        center_name = null;
      }

      await this.subscriptionService.subscribe(
        user.id.toString(),
        subId,
        instructor_name,
        center_name,
        instructor_id,
      );
      console.log(user);
      this.subscriptionService.emailService
        .sendBulkEmail(
          [this.configService.get('MAIN_EMAIL'), email],
          'Certificates Subscription Success',
          'Certificates Subscription Success',
          `Your subscription was successful. Your password is ${user.password} and your email is ${email}`,
          'Congratulations on your subscription',
        )
        .then(() => {
          console.log('Email sent');
        });
      res.render('payment-success', {
        email,
        password,
      });
    } catch (error) {
      res.render('payment-failed', {
        error: error.message,
      });
      console.error('Error handling payment success:', error);
    }
  }
  @Get('payment-cancel')
  async handlePaymentCancel(@Res() res: Response) {
    res.render('payment-failed', {
      message: 'Payment was cancelled',
    });
  }
}
