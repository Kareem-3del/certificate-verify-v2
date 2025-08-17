import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from './stripe/stripe.module';
import { Transaction } from './entities';
import { PaymentService } from './payment.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Transaction]),
    StripeModule.forRootAsync(),
    SubscriptionsModule,
  ],
  providers: [PaymentService],
  exports: [PaymentService, StripeModule],
  controllers: [],
})
export class PaymentModule {}
