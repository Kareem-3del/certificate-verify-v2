import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities';
import { PaymentModule } from '../payment.module';

@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Transaction]),
        PaymentModule,
      ],
      providers: [
        {
          provide: 'STRIPE_SECRET_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.getOrThrow('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
        StripeService,
      ],
      exports: [StripeService],
    };
  }
}
