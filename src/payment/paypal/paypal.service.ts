import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { core, orders } from '@paypal/checkout-server-sdk';
import { PayPalHttpClient } from '@paypal/checkout-server-sdk/lib/core/paypal_http_client';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';

@Injectable()
export class PaypalService {
  public paypalClient: PayPalHttpClient;

  constructor(
    public configService: ConfigService,
    private subscriptionService: SubscriptionsService,
  ) {
    this.paypalClient = new core.PayPalHttpClient(
      new core.LiveEnvironment(
        this.configService.get<string>('PAYPAL_CLIENT_ID'),
        this.configService.get<string>('PAYPAL_CLIENT_SECRET'),
      ),
    );
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
    const request = new orders.OrdersCreateRequest();
    const metadata = {
      email,
      subId,
      instructor_name,
      instructor_id,
      center_name,
    };
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: price.toFixed(2),
          },
          description: name || 'Add Points',
          custom_id: JSON.stringify(metadata),
          invoice_id: `INVOICE-${subId}`,
        },
      ],
      application_context: {
        brand_name: 'Certificates',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${this.configService.get<string>('BASE_URL')}/paypal/payment-success`,
        cancel_url: `${this.configService.get<string>('BASE_URL')}/paypal/payment-cancel`,
      },
    });

    const response = await this.paypalClient.execute(request);
    console.log(response.result);
    return response.result.links.find(
      (link: { rel: string }) => link.rel === 'approve',
    ).href;
  }
}
