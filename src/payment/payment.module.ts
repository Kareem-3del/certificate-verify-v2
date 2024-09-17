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
import { Payid19Module } from './payid19/payid19.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Transaction]),
    StripeModule.forRootAsync(),
    Payid19Module,
    SubscriptionsModule,
  ],
  providers: [PaymentService, PaypalService],
  exports: [PaymentService, StripeModule, PaypalService, Payid19Module],
  controllers: [PaypalController],
})
export class PaymentModule {}
