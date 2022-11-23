import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Role extends Base {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
