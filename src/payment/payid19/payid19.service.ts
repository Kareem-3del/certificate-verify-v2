import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class Payid19Service {
  private readonly apiUrl: string;
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = 'https://payid19.com/api/v1';
    this.publicKey = this.configService.get<string>('PAYID19_PUBLIC_KEY');
    this.privateKey = this.configService.get<string>('PAYID19_PRIVATE_KEY');
  }

  // Create Invoice with Payid19
  async createInvoice(
    price: number,
    orderId: string,
    customerId: number,
    title: string,
    description: string,
    metadata: any,
  ): Promise<string> {
    const successUrl = `${this.configService.get<string>('BASE_URL')}/payid19/payment-success`;
    const cancelUrl = `${this.configService.get<string>('BASE_URL')}/payid19/payment-cancel`;

    const queryMetadata = metadata ? JSON.stringify(metadata) : '';

    try {
      const response = await axios.post(`${this.apiUrl}/create_invoice`, {
        public_key: this.publicKey,
        private_key: this.privateKey,
        price_amount: price,
        price_currency: 'USD',
        order_id: orderId || null,
        customer_id: customerId || null,
        title: title || 'Invoice Title',
        description: description || 'Invoice Description',
        success_url:
          successUrl +
          (queryMetadata
            ? `?metadata=${encodeURIComponent(queryMetadata)}`
            : ''),
        cancel_url: cancelUrl,
        callback_url: `${this.configService.get<string>('BASE_URL')}/payid19/payment-callback`,
      });

      const data = response.data;

      if (data.status === 'success') {
        return data.message; // The invoice URL
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log('Payid19 response:', error.response?.data || error.message);
      console.error('Error creating invoice:', error.message);
      throw new Error('Failed to create invoice.');
    }
  }
}
