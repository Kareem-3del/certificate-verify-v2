import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from '../../users/users.service';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;

  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
    private userService: UsersService,
    private subscriptionService: SubscriptionsService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get<string>('STRIPE_SECRET_KEY');

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata.userId;
      const subId = session.metadata.subId;
      // Update user points in the database
      await this.updateUserPoints(userId, subId);
    }

    res.status(200).send({ received: true });
  }

  @Post('create-payment-link')
  async createPaymentLink(@Req() req: Request, @Res() res: Response) {
    const { userId, subId } = req.body;
    const sub = await this.subscriptionService.findOne(subId);
    const url = await this.stripeService.createPaymentLink(
      userId,
      sub.price,
      sub.id.toString(),
    );
    return res.send({ url });
  }

  private async updateUserPoints(userId: string, subId: string) {
    return this.userService.subscribe(userId, subId);
  }
}
