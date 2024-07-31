import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from './stripe/stripe.module';
import { Transaction } from './entities';
import { PaymentService } from './payment.service';
// import { PaypalModule } from './paypal/paypal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    StripeModule.forRootAsync(),
  ],
  providers: [PaymentService],
  exports: [StripeModule, PaymentService],
})
export class PaymentModule {}
