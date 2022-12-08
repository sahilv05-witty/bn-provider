import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Base } from '../shared/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Provider extends Base {
  @Column()
  name: string;

  @Column()
  group: string;

  @Column()
  brighttreeId: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => User, (user) => user?.provider, { nullable: true })
  @JoinColumn()
  user?: User;

  @OneToMany(() => Patient, (patient) => patient.provider)
  patients: Patient[];

  @Column({ default: false })
  useSalutation: boolean;
}
