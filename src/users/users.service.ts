import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly subscriptionsService: SubscriptionsService,
  ) {
    this.userRepository.find().then((users) => {
      if (users.length === 0) {
        this.create('admin', 'admin', 'admin').then((r) =>
          console.log('Admin user created', r),
        );
      }
    });
  }

  async create(
    username: string,
    password: string,
    role: 'admin' | 'moderator' = 'moderator',
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
    return this.userRepository.findOneBy({ id });
  }

  async subscribe(Userid: string, subId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: Number(Userid) });
    if (!user) {
      throw new NotFoundException(`User with ID ${Userid} not found`);
    }
    const subscription = await this.subscriptionsService.findOne(Number(subId));
    user.points += subscription.points;
    user.subscriptions.push(subscription);
    await this.subscriptionsService.update(subscription.id, {
      purchased: ++subscription.purchased,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'role'], // We don't need to return the password
    });
  }
}
