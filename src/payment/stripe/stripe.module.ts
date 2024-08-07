import { DynamicModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { StripeController } from './stripe.controller';
import { SubscriptionsModule } from '../../subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => SubscriptionsModule),
  ],
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
        forwardRef(() => SubscriptionsModule),
      ],
      providers: [
        {
          provide: 'STRIPE_SECRET_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
        StripeService,
      ],
      controllers: [StripeController],
      exports: [StripeService],
    };
  }
}
