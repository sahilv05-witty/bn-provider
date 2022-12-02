import { Column, Entity, OneToMany } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Base } from '../shared/base.entity';

@Entity()
export class GlossaryPatientStatus extends Base {
  @Column({ nullable: true })
  beId?: number; // be - backend

  @Column({ nullable: true })
  beState?: string;

  @Column()
  description: string;

  @Column()
  dataSource: string;

  @Column()
  pathway: string;

  @Column()
  patientStatus: string;

  @Column()
  patientStatusDefinition: string;

  @OneToMany(() => Patient, (patient) => patient.status)
  patients: Patient[];
}
