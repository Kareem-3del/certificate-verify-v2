import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

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
