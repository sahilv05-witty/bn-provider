import { Column, Entity } from 'typeorm';
import { Base } from '../shared/base.entity';

@Entity()
export class GlossaryUserTypeSetting extends Base {
  @Column()
  entryPoint: string;

  @Column()
  initialState: string;

  @Column()
  skipHST: boolean;

  @Column()
  isFollowupAllowed: boolean;

  @Column()
  service: string;

  @Column()
  serviceDefinition: string;
}
