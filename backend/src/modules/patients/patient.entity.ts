import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { Glossary } from '../glossaries/glossary.entity';
import { Provider } from '../providers/provider.entity';
import { GlossaryPatientStatus } from '../glossaries/glossary-patient-status.entity';
import { GlossaryUserTypeSetting } from '../glossaries/glossary-user-type-setting.entity';

@Entity()
export class Patient extends Base {
  @Column()
  brighttreeNumber: number;

  @Column()
  betterNightId: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  dateOfBirth?: Date;

  @Column({ nullable: true })
  entryPoint: string;

  @Column({ nullable: true })
  pathway: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  skipHST: boolean;

  @Column()
  isFollowupAllowed: boolean;

  @ManyToOne(
    () => GlossaryUserTypeSetting,
    (userTypeSetting) => userTypeSetting.patients,
    { eager: true },
  )
  service: GlossaryUserTypeSetting;

  @ManyToOne(
    () => GlossaryPatientStatus,
    (patientStatus) => patientStatus.patients,
    { eager: true },
  )
  status: GlossaryPatientStatus;

  @Column()
  statusDate: Date;

  @ManyToOne(() => Provider, (provider) => provider.patients, { eager: true })
  provider: Provider;
}
