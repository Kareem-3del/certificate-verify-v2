import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    // Inject the repository
    @InjectRepository(Subscription)
    public subscriptionRepository: Repository<Subscription>,
    public readonly paymentService: PaymentService,
    @Inject(forwardRef(() => UsersService))
    public readonly usersService: UsersService,
    public emailService: EmailService,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  findAll() {
    return this.subscriptionRepository.find();
  }

  async toDayEarnings(): Promise<number> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        created_at: MoreThan(new Date(new Date().setHours(0, 0, 0, 0))),
      },
    });
    return subscriptions.reduce(
      (total, sub) => total + sub.price * sub.purchased,
      0,
    );
  }

  async calculateTotalEarnings(fromDate: Date): Promise<number> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        // created_at: MoreThan(fromDate), // Filter by date range
      },
      relations: ['users'],
    });

    return subscriptions.reduce(
      (total, sub) => total + sub.price * sub.purchased,
      0,
    );
  }
  async calculateEarningsPerDay(
    fromDate: Date,
    toDate: Date,
  ): Promise<Record<string, number>> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        created_at: Between(fromDate, toDate), // Filter by date range
      },
      relations: ['users'],
    });

    const earningsPerDay: Record<string, number> = {};

    subscriptions.forEach((sub) => {
      const date = sub.created_at.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
      if (!earningsPerDay[date]) {
        earningsPerDay[date] = 0;
      }
      earningsPerDay[date] += sub.price * sub.purchased; // Accumulate earnings per day
    });

    return earningsPerDay;
  }

  async getMostSubscribed(fromDate: Date): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        created_at: MoreThan(fromDate), // Filter by date range
      },
      take: 10, // Get the top 5 subscriptions
      relations: ['users'], // Include users in the query
    });

    // Sort subscriptions by the number of users in descending order
    // Delete users after sorting
    return subscriptions
      .sort((a, b) => b.users.length - a.users.length)
      .map((sub) => {
        delete sub.users;
        delete sub.emailMessage;
        return sub;
      });
  }

  async calculateReSubscribeRate(fromDate: Date): Promise<number> {
    const users = await this.usersService.findAll();
    let reSubscribedCount = 0;

    for (const user of users) {
      const subscriptions = await this.usersService.getUserSubscriptions(
        user.id,
        fromDate,
      ); // Get user subscriptions from date
      if (subscriptions.length > 1) {
        reSubscribedCount++;
      }
    }

    return (reSubscribedCount / users.length) * 100; // Percentage
  }

  async calculateSameUserReSubscribeRate(fromDate: Date): Promise<number> {
    const users = await this.usersService.findAll();
    let sameUserReSubscribedCount = 0;

    for (const user of users) {
      const subscriptions = await this.usersService.getUserSubscriptions(
        user.id,
        fromDate,
      );
      const uniqueSubscriptions = new Set(subscriptions.map((sub) => sub.id));
      if (uniqueSubscriptions.size < subscriptions.length) {
        sameUserReSubscribedCount++;
      }
    }

    return (sameUserReSubscribedCount / users.length) * 100; // Percentage
  }

  async recentSubscriptions(): Promise<Subscription[]> {
    // take last 10
    return this.subscriptionRepository.find({
      order: {
        created_at: 'DESC',
      },
      take: 10,
    });
  }

  async totalSubscriptions(formDate: Date): Promise<number> {
    return this.subscriptionRepository.count({
      where: {
        created_at: MoreThan(formDate), // Count from start date
      },
    });
  }

  async calculateGrowth(fromDate: Date): Promise<number> {
    const currentPeriodSubscriptions = await this.subscriptionRepository.count({
      where: {
        created_at: MoreThan(fromDate), // Count from start date
      },
    });

    const previousPeriodSubscriptions = await this.subscriptionRepository.count(
      {
        where: {
          created_at: MoreThan(
            new Date(fromDate.getTime() - 30 * 24 * 60 * 60 * 1000),
          ), // Count from 30 days before the 'fromDate'
        },
      },
    );

    return (
      ((currentPeriodSubscriptions - previousPeriodSubscriptions) /
        previousPeriodSubscriptions) *
      100
    ); // Percentage
  }
  findOne(id: number) {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionRepository.update(id, updateSubscriptionDto);
  }

  remove(id: number) {
    return this.subscriptionRepository.delete(id);
  }

  async subscribe(
    userId: string,
    subId: string,
    instructorName?: string,
    centerName?: string,
    instructorId?: string,
  ) {
    return this.usersService.subscribe(
      userId,
      subId,
      instructorName,
      centerName,
      instructorId,
    );
  }
}
