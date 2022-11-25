import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { Glossary } from '../glossaries/glossary.entity';
import { Provider } from '../providers/provider.entity';

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

  @ManyToOne(() => Glossary, (glossary) => glossary.entryPoints, {
    eager: true,
  })
  entryPoint: Glossary;

  @ManyToOne(() => Glossary, (glossary) => glossary.pathways, { eager: true })
  currentPathway: Glossary;

  @ManyToOne(() => Glossary, (glossary) => glossary.statuses, { eager: true })
  status: Glossary;

  @Column()
  statusDate: Date;

  @ManyToOne(() => Provider, (provider) => provider.patients, { eager: true })
  provider: Provider;
}
