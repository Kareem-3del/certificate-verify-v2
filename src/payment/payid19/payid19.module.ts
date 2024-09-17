import { Module } from '@nestjs/common';
import { Payid19Service } from './payid19.service';
import { Payid19Controller } from './payid19.controller';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsModule } from '../../subscriptions/subscriptions.module';

@Module({
  imports: [ConfigModule, SubscriptionsModule],
  controllers: [Payid19Controller],
  providers: [Payid19Service],
  exports: [Payid19Service],
})
export class Payid19Module {}
