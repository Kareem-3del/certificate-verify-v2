// src/certificates/certificate.ejs.entity.ts
import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  certificate_path: string;

  @Column({ nullable: true })
  id_path: string;

  @Column({ default: '-----' })
  city: string;

  @Column({ default: '-----' })
  training_site_name: string;

  @CreateDateColumn()
  issued: Date;

  @Column({ default: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000) })
  express: Date;

  @Column({ nullable: true })
  instructor_id: string;

  @Column({ nullable: true })
  instructor_name: string;

  @Column({ nullable: true })
  renew_by: string;

  @Column({ nullable: true })
  training_center_name: string;

  @Column({ nullable: true })
  training_center_id: string;

  @CreateDateColumn()
  created_at: Date;
}
