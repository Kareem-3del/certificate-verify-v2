// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // Ensure to hash passwords before storing

  @Column({ default: 'moderator' })
  role: 'admin' | 'moderator';
  // Add other properties as needed
}
