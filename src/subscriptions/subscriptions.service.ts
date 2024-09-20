import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { MoreThan, Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    // Inject the repository
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    public readonly paymentService: PaymentService,
    @Inject(forwardRef(() => UsersService))
    public readonly usersService: UsersService,
    public emailService: EmailService,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  async calculateTotalEarnings(): Promise<number> {
    const subscriptions = await this.subscriptionRepository.find({
      relations: ['users'],
    });
    return subscriptions.reduce(
      (total, sub) => total + sub.price * sub.purchased,
      0,
    );
  }

  async getMostSubscribed(): Promise<Subscription> {
    const subscriptions = await this.subscriptionRepository.find({
      relations: ['users'],
    });
    return subscriptions.reduce((most, sub) => {
      return sub.users.length > most.users.length ? sub : most;
    });
  }

  async calculateReSubscribeRate(): Promise<number> {
    const users = await this.usersService.findAll(); // Assuming you have a method to get all users
    let reSubscribedCount = 0;

    for (const user of users) {
      const subscriptions = await this.usersService.getUserSubscriptions(
        user.id,
      ); // Replace with actual method to get subscriptions
      if (subscriptions.length > 1) {
        reSubscribedCount++;
      }
    }

    return (reSubscribedCount / users.length) * 100; // Percentage
  }

  async calculateSameUserReSubscribeRate(): Promise<number> {
    const users = await this.usersService.findAll();
    let sameUserReSubscribedCount = 0;

    for (const user of users) {
      const subscriptions = await this.usersService.getUserSubscriptions(
        user.id,
      );
      const uniqueSubscriptions = new Set(subscriptions.map((sub) => sub.id));
      if (uniqueSubscriptions.size < subscriptions.length) {
        sameUserReSubscribedCount++;
      }
    }

    return (sameUserReSubscribedCount / users.length) * 100; // Percentage
  }

  async calculateGrowth(): Promise<number> {
    const currentPeriodSubscriptions =
      await this.subscriptionRepository.count();
    const previousPeriodSubscriptions = await this.subscriptionRepository.count(
      {
        where: {
          created_at: MoreThan(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
        },
      },
    );

    return (
      ((currentPeriodSubscriptions - previousPeriodSubscriptions) /
        previousPeriodSubscriptions) *
      100
    ); // Percentage
  }

  findAll() {
    return this.subscriptionRepository.find();
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
