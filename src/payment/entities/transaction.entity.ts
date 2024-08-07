import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  type: 'in' | 'out';

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column('json', { nullable: true, default: null })
  result: any;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((transaction: Transaction) => transaction.user)
  @Column()
  user_id: number;

  @Column({ nullable: true })
  method: string;

  @CreateDateColumn()
  created_at: Date;
}
