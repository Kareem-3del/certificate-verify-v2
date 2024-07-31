import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createPaymentLink(
    userId: string,
    amount: number,
    subId: string,
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Add Points',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get<string>('BASE_URL')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get<string>('BASE_URL')}/payment-cancel`,
      metadata: {
        userId,
        subId,
      },
    });

    return session.url;
  }
}
