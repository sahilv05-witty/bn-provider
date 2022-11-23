import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { UserStateGlossary } from '../userStateGlossaries/user-state-glossary.entity';

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

  @OneToMany(
    () => UserStateGlossary,
    (userStateGlossary) => userStateGlossary.entryPoints,
  )
  entryPoint: UserStateGlossary;

  @OneToMany(
    () => UserStateGlossary,
    (userStateGlossary) => userStateGlossary.pathways,
  )
  currentPathway: UserStateGlossary;

  @OneToMany(
    () => UserStateGlossary,
    (userStateGlossary) => userStateGlossary.statuses,
  )
  status: UserStateGlossary;
}
