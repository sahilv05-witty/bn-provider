import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Base } from '../shared/base.entity';

@Entity()
export class Glossary extends Base {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  type: string;

  @OneToMany(() => Patient, (patient) => patient.entryPoint)
  entryPoints: Patient[];

  @OneToMany(() => Patient, (patient) => patient.pathway)
  pathways: Patient[];

  @OneToMany(() => Patient, (patient) => patient.status)
  statuses: Patient[];
}
