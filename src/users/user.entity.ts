// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Transaction } from '../payment/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // Ensure to hash passwords before storing

  @Column({ default: 'customer', enum: ['admin', 'moderator', 'customer'] })
  role: 'admin' | 'moderator' | 'customer';

  @Column({ default: 0 })
  points: number;

  @ManyToMany(() => Subscription, (subscription) => subscription.users, {
    eager: true,
  })
  @JoinTable()
  subscriptions: Subscription[];

  @Column({ nullable: true })
  center_name: string;

  @Column({ nullable: true })
  instructor_name: string;

  @Column({ nullable: true })
  instructor_id: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
