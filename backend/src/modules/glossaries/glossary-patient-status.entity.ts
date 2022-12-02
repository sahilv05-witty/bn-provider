import { Column, Entity } from 'typeorm';
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
}
