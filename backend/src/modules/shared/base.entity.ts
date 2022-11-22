import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdBy: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true, default: null })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
