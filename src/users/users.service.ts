import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { ConfigService } from '@nestjs/config';
import { Subscription } from '../subscriptions/entities/subscription.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    public readonly subscriptionsService: SubscriptionsService,
    private readonly configService: ConfigService,
  ) {
    this.userRepository.find().then((users) => {
      if (users.length === 0) {
        this.create('admin', 'admin', 'admin').then((r) =>
          console.log('Admin user created', r),
        );
      }
    });
    console.log('UsersService created');
  }

  async getUserAnalysis(daysAgo: number): Promise<any> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysAgo);

    const totalUsers = await this.countTotalUsers();
    const subscriptionsByUser = await this.countSubscriptionsByUser();
    const newUsers = await this.countNewUsers(daysAgo);
    const userSubscriptionAnalysis =
      await this.getUserSubscriptionAnalysis(daysAgo);
    const recentCustomers = await this.recentCustomers();
    return {
      totalUsers,
      recentCustomers,
      subscriptionsByUser,
      newUsers,
      userSubscriptionAnalysis,
    };
  }
  async recentCustomers(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        //  role: 'customer',
      },
      order: {
        created_at: 'DESC',
      },
      take: 10,
    });
  }

  async updateSubscriptionPurchasedCounts() {
    // Fetch all subscriptions along with their associated users
    const subscriptions =
      await this.subscriptionsService.subscriptionRepository.find({
        relations: ['users'],
      });

    console.log(
      'Updating purchased count for all subscriptions',
      subscriptions,
    );
    // Loop through each subscription
    for (const subscription of subscriptions) {
      subscription.purchased = subscription?.users?.length || 0;
      await this.subscriptionsService.subscriptionRepository.save(subscription);
    }

    return 'Purchased count updated for all subscriptions';
  }

  async login(loginDto: { email: string; password: string }): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.email },
    });

    if (!user || user.password !== loginDto.password) {
      return null;
    }

    return user;
  }

  async countTotalUsers(): Promise<number> {
    return this.userRepository.count();
  }

  async countUsersByRole(): Promise<{ role: string; count: number }[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.role', 'role')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('user.role')
      .getRawMany();
  }

  async countSubscriptionsByUser(): Promise<
    { username: string; count: number }[]
  > {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.subscriptions', 'subscription')
      .select('user.username', 'username')
      .addSelect('COUNT(subscription.id)', 'count')
      .groupBy('user.username')
      .getRawMany();
  }

  async countNewUsers(daysAgo: number): Promise<number> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysAgo);
    return this.userRepository.count({
      where: {
        created_at: MoreThan(fromDate),
      },
    });
  }

  async getUserSubscriptionAnalysis(
    daysAgo: number,
  ): Promise<{ username: string; recentSubscriptions: number }[]> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysAgo);

    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.subscriptions', 'subscription')
      .select('user.username', 'username')
      .addSelect('COUNT(subscription.id)', 'recentSubscriptions')
      .where('subscription.created_at > :fromDate', { fromDate })
      .groupBy('user.username')
      .getRawMany();
  }
  async getUserSubscriptions(
    userId: number,
    fromDate?: Date,
  ): Promise<Subscription[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscriptions'], // Load the user's subscriptions
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // If a date filter is provided, filter subscriptions by creation date
    if (fromDate) {
      return user.subscriptions.filter(
        (subscription) => new Date(subscription.created_at) > fromDate,
      );
    }

    // Return all subscriptions if no date filter is provided
    return user.subscriptions;
  }

  async create(
    username: string,
    password: string,
    role: 'admin' | 'moderator' | 'customer' = 'customer',
  ): Promise<User> {
    const newUser = this.userRepository.create({ username, password, role });
    return await this.userRepository.save(newUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['subscriptions'],
    });
  }

  async subscribe(
    Userid: string,
    subId: string,
    instructor_name?: string,
    center_name?: string,
    instructor_id?: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: Number(Userid) });
    if (!user) {
      throw new NotFoundException(`User with ID ${Userid} not found`);
    }

    const subscription = await this.subscriptionsService.findOne(+subId);

    subscription.emailMessage = subscription.emailMessage.replaceAll(
      '[EMAIL]',
      user.username,
    );
    subscription.emailMessage = subscription.emailMessage.replaceAll(
      '[INSTRUCTOR_NAME]',
      instructor_name,
    );
    subscription.emailMessage = subscription.emailMessage.replaceAll(
      '[PASSWORD]',
      user.password,
    );
    subscription.emailMessage = subscription.emailMessage.replaceAll(
      '[CENTER_NAME]',
      center_name,
    );
    subscription.emailMessage = subscription.emailMessage.replaceAll(
      '[INSTRUCTOR_ID]',
      instructor_id,
    );
    subscription.emailMessage = subscription.emailMessage.replaceAll(
      '[POINTS]',
      subscription.points.toString(),
    );

    await this.subscriptionsService.emailService.sendEmail(
      user.username,
      'Certificates Subscription Success',
      'Congratulations on your subscription',
      subscription.emailMessage,
      [],
    );
    if (this.configService.get('MAIN_EMAIL')) {
      await this.subscriptionsService.emailService.sendEmail(
        this.configService.get('MAIN_EMAIL'),
        `New Subscriber You Eran :[${subscription.price}$] By` +
          subscription.name,
        'User ' +
          user.username +
          ' has subscribed to ' +
          subscription.name +
          ' you earn ' +
          subscription.price +
          'USD || ' +
          'Time : ' +
          new Date().toLocaleString(),
        'Congratulations on your subscription',
        [],
      );
    }

    user.points += subscription.points;
    user.subscriptions.push(subscription);
    await this.subscriptionsService.update(subscription.id, {
      purchased: ++subscription.purchased,
    });
    return this.userRepository.save({
      ...user,
      instructor_name,
      center_name,
      instructor_id,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'role'], // We don't need to return the password
    });
  }
}
