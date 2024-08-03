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

  @Column({ nullable: true })
  details_link: string;

  @Column({ default: false })
  instructor_id: boolean;

  @Column({ default: false })
  instructor_id_random: boolean;

  @Column({ default: false })
  instructor_name: boolean;

  @Column({ default: false })
  center_name: boolean;

  @ManyToMany(() => User, (user) => user.subscriptions, {
    cascade: ['remove'],
  })
  @JoinTable()
  users: User[];
}
