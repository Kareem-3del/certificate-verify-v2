import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'Certificate' })
  emailSubject?: string;

  @Column({ default: 'Hello, this is your certificate!' })
  emailBody?: string;

  @Column()
  instructorName: string;

  @Column()
  instructorId: string;

  @Column()
  trainingCenterName: string;

  @Column()
  trainingCenterId: string;

  @Column()
  tcCity: string;

  @Column()
  trainingSiteName: string;
}
