import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from './stripe/stripe.module';
import { Transaction } from './entities';
import { PaymentService } from './payment.service';
// import { PaypalModule } from './paypal/paypal.module';
import { PaypalService } from './paypal/paypal.service';
import { PaypalController } from './paypal/paypal.controller';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Transaction]),
    StripeModule.forRootAsync(),
    SubscriptionsModule,
  ],
  providers: [PaymentService, PaypalService],
  exports: [PaymentService, StripeModule, PaypalService],
  controllers: [PaypalController],
})
export class PaymentModule {}
