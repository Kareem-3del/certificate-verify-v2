import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  public stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }
  async retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return await this.stripe.checkout.sessions.retrieve(sessionId);
  }

  async createPaymentLink(
    email: string,
    price: number,
    subId: string,
    name: string,
    instructor_name: string,
    instructor_id: string,
    center_name: string,
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card', /*'paypal',*/ 'link'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name || 'Add Points',
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get<string>('BASE_URL')}/stripe/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get<string>('BASE_URL')}/stripe/payment-cancel`,
      metadata: {
        email,
        subId,
        instructor_id,
        center_name,
        instructor_name,
      },
    });
    console.log(session.metadata);
    return session.url;
  }
}
