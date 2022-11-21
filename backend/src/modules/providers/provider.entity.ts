import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
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
}
