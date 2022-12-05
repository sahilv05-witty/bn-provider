import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
