import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { User } from '../../users/user.entity';

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;

  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
    private subscriptionService: SubscriptionsService,
  ) {
    this.stripe = this.stripeService.stripe;
  }

  @Post('create-payment-link')
  async createPaymentLink(@Req() req: Request, @Res() res: Response) {
    const { userId, subId, instructor_id, instructor_name, center_name } =
      req.body;
    const sub = await this.subscriptionService.findOne(subId);
    const url = await this.stripeService.createPaymentLink(
      userId,
      sub.price,
      sub.id.toString(),
      sub.name,
      instructor_name,
      instructor_id,
      center_name,
    );
    return res.send({ url });
  }

  @Get('payment-success/')
  async handlePaymentSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    try {
      const session = await this.stripeService.retrieveSession(sessionId);
      const subId = session.metadata.subId;
      const email = session.metadata.email;
      console.log(session.metadata);
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

      let instructor_id = session.metadata.instructor_id;
      let instructor_name = session.metadata.instructor_name;
      let center_name = session.metadata.center_name;

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
}
