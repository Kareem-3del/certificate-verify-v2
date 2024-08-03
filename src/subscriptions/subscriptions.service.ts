import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
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

  findAll() {
    return this.subscriptionRepository.find();
  }

  findOne(id: number) {
    return this.subscriptionRepository.findOneBy({ id });
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
