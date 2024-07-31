import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities';
import { Repository } from 'typeorm';

export class PaymentService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async get_transactions(user_id: number) {
    return this.transactionRepository.findBy({ user_id: user_id });
  }
  async generateCustomId(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2); // last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month with leading zero
    const day = date.getDate().toString().padStart(2, '0'); // day with leading zero

    const todayStart = new Date(date.setHours(0, 0, 0, 0));
    const count = await this.transactionRepository.count({
      where: { created_at: todayStart },
    });

    const increment = (count + 1).toString().padStart(4, '0'); // increment with leading zeroes
    return `${year}${month}${day}${increment}`;
  }
}
