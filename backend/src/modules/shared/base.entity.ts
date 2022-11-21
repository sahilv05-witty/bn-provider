import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdBy: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  updatedAt?: Date;
}
