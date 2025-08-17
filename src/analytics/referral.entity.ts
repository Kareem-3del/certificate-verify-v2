import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Referral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string; // 'google', 'facebook', 'direct', 'twitter', etc.

  @Column({ nullable: true })
  medium: string; // 'organic', 'cpc', 'social', 'referral', etc.

  @Column({ nullable: true })
  campaign: string; // campaign name if available

  @Column({ nullable: true })
  referrer_url: string; // full referrer URL

  @Column({ nullable: true })
  landing_page: string; // page where user landed

  @Column({ nullable: true })
  user_agent: string; // browser/device info

  @Column({ nullable: true })
  ip_address: string; // user IP for geolocation

  @Column({ nullable: true })
  country: string; // derived from IP

  @Column({ nullable: true })
  city: string; // derived from IP

  @Column({ default: false })
  converted: boolean; // whether this visit resulted in a purchase

  @Column({ nullable: true })
  conversion_value: number; // revenue if converted

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  session_id: string; // track user sessions

  @Column({ nullable: true })
  utm_source: string; // UTM parameters

  @Column({ nullable: true })
  utm_medium: string;

  @Column({ nullable: true })
  utm_campaign: string;

  @Column({ nullable: true })
  utm_term: string;

  @Column({ nullable: true })
  utm_content: string;
}
