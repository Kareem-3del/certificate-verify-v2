import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';

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

  @Column({ nullable: true })
  id_and_cert_path: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: '-----' })
  city: string;

  @Column({ default: '-----' })
  training_site_name: string;

  @CreateDateColumn()
  issued: Date;

  @Column()
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

  @BeforeInsert()
  setExpressDate() {
    this.express = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000); // 2 years from now
  }
}
