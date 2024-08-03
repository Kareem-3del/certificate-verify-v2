import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    private readonly subscriptionsService: SubscriptionsService,
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
