import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaypalService } from './paypal.service';
import { orders } from '@paypal/checkout-server-sdk';
import { User } from '../../users/user.entity';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';

@Controller('paypal')
export class PaypalController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly subscriptionService: SubscriptionsService,
  ) {}
  @Get('payment-success/')
  async handlePaymentSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
    @Query('token') orderId: string,
  ) {
    try {
      // const orderId = token; // PayPal uses 'token' as the query parameter for order ID
      const request = new orders.OrdersGetRequest(orderId);
      const response = await this.paypalService.paypalClient.execute(request);

      const customId = response.result.purchase_units[0].custom_id;
      const metadata = JSON.parse(customId);

      // eslint-disable-next-line prefer-const
      let { subId, email, instructor_id, instructor_name, center_name } =
        metadata;
      const sub = await this.subscriptionService.findOne(+subId);

      console.log(metadata);
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

      // Handle instructor and center details
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
