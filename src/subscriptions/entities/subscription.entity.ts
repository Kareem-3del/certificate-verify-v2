import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  points: number;
  @Column()
  configId: number;
  @Column({ default: 0 })
  purchased: number;

  @ManyToMany(() => User, (user) => user.subscriptions)
  @JoinTable()
  users: User[];
}
