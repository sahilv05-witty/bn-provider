import { Column, Entity } from 'typeorm';
import { Base } from '../shared/base.entity';

@Entity()
export class Reference extends Base {
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
}
