import { Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Base } from '../shared/base.entity';

@Entity()
export class UserStateGlossary extends Base {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  type: string;

  @ManyToOne(() => Patient, (patient) => patient.entryPoint)
  entryPoints: Patient[];

  @ManyToOne(() => Patient, (patient) => patient.currentPathway)
  pathways: Patient[];

  @ManyToOne(() => Patient, (patient) => patient.status)
  statuses: Patient[];
}
