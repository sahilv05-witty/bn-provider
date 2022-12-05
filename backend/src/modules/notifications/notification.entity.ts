import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emailType: number;

  @Column()
  emailFrom: string;

  @Column()
  emailTo: string;

  @Column({ nullable: true })
  cc?: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  htmlMessage?: string;

  @Column()
  status: string;

  @Column()
  maxRetryCount: number;

  @Column()
  currentRetryIndex: number;

  @Column({ nullable: true })
  mailSentAt?: Date;

  @Column({ nullable: true })
  retryAfter: number;

  @Column({ nullable: true })
  lastAttemptedAt: Date;

  @ManyToOne(() => User, (user) => user.notifications, {
    nullable: true,
    eager: true,
  })
  user?: User;
}
