import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Render,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Response } from 'express';
import { PaypalService } from '../payment/paypal/paypal.service';
import { StripeService } from '../payment/stripe/stripe.service';
import { Payid19Service } from '../payment/payid19/payid19.service';
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly paypalService: PaypalService,
    private readonly stripeService: StripeService,
    private readonly payid19Service: Payid19Service,
  ) {}

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }
  @Get('analysis')
  async analysis(@Query('days') days: number) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days); // Set the start date to the past 'days'

    const totalEarnings =
      await this.subscriptionsService.calculateTotalEarnings(fromDate);
    const toDayEarnings = await this.subscriptionsService.toDayEarnings();

    const mostSubscription =
      await this.subscriptionsService.getMostSubscribed(fromDate);
    const rateOfReSubscribe =
      await this.subscriptionsService.calculateReSubscribeRate(fromDate);
    const rateOfSameUserReSubscribe =
      await this.subscriptionsService.calculateSameUserReSubscribeRate(
        fromDate,
      );
    const growth = await this.subscriptionsService.calculateGrowth(fromDate);
    const totalSubscriptions =
      await this.subscriptionsService.totalSubscriptions(fromDate);
    const recentSubscriptions =
      await this.subscriptionsService.recentSubscriptions();

    const earningsPerDay =
      await this.subscriptionsService.calculateEarningsPerDay(
        fromDate,
        new Date(),
      );
    return {
      totalEarnings,

      toDayEarnings,
      totalSubscriptions,
      earningsPerDay,
      mostSubscription,
      rateOfReSubscribe,
      rateOfSameUserReSubscribe,
      recentSubscriptions,
      growth,
    };
  }

  @Get(':id')
  @Render('subscription')
  async findOne(@Param('id') id: string) {
    const sub = await this.subscriptionsService.findOne(+id);
    if (!sub) {
      return {
        error: true,
        sub: {
          id: 'Not Found',
          name: 'Not found',
          price: 'Not Found',
          points: 'Not Found',
        },
      };
    }
    console.log(sub);
    return { sub, error: false };
  }

  @Get('json/:id')
  async findOneJson(@Param('id') id: string) {
    const sub = await this.subscriptionsService.findOne(+id);
    if (!sub) {
      return {
        error: true,
        sub: {
          id: 'Not Found',
          name: 'Not found',
          price: 'Not Found',
          points: 'Not Found',
        },
      };
    }
    return sub;
  }

  @Post(':id/checkout')
  async checkout(
    @Param('id') id: string,
    @Body('email') email: string,
    @Body('instructor_id') instructor_id: string,
    @Body('instructor_name') instructor_name: string,
    @Body('center_name') center_name: string,
    @Body('pay_with') pay_with: string,
    @Res() res: Response,
  ) {
    try {
      const sub = await this.subscriptionsService.findOne(+id);
      console.log(sub, 'sub');
      if (!sub) {
        throw new HttpException('Subscription not found', 404);
      }
      let url = null;
      switch (pay_with) {
        case 'crypto':
          if (!email) {
            throw new HttpException('Email is required', 400);
          }
          url = await this.payid19Service.createInvoice(
            sub.price,
            sub.id.toString(),
            sub.id,
            sub.name + ' Subscription ' + sub.points + ' Points',
            'Subscription for ' +
              sub.name +
              ' with ' +
              instructor_name +
              ' at ' +
              center_name,
            {
              email,
              userId: sub.id,
              subId: sub.id,
              instructor_id,
              instructor_name,
              center_name,
            },
          );
          res.redirect(url);
          return { sub, error: false, email, url };
        case 'stripe':
          if (!email) {
            throw new HttpException('Email is required', 400);
          }
          url = await this.stripeService.createPaymentLink(
            email,
            sub.price,
            sub.id.toString(),
            sub.name + ' Subscription ' + sub.points + ' Points',
            instructor_name,
            instructor_id,
            center_name,
          );
          res.redirect(url);
          return { sub, error: false, email, url };
        default:
          url = await this.paypalService.createPaymentLink(
            email,
            sub.price,
            sub.id.toString(),
            sub.name + ' Subscription ' + sub.points + ' Points',
            instructor_name,
            instructor_id,
            center_name,
          );
      }
      res.redirect(url);
      return { sub, error: false, email, url };
    } catch (e) {
      console.log(e, 'error');
      res.render('payment-failed', { error: e.message });
    }
  }

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('Removing subscription with id', id);
    const sub = await this.subscriptionsService.findOne(+id);
    if (!sub) {
      throw new HttpException('Subscription not found', 404);
    }
    if (sub.users.length > 0) {
      // delete subscription from users
      for (const user of sub.users) {
        const index = user.subscriptions.findIndex((s) => s.id === sub.id);
        if (index > -1) {
          user.subscriptions.splice(index, 1);
          await this.subscriptionsService.usersService.userRepository.save(
            user,
          );
        }
      }
    }
    return this.subscriptionsService.remove(+id);
  }
}
