import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Provider } from '../providers/provider.entity';
import { Role } from '../roles/role.entity';
import { Base } from '../shared/base.entity';

@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  termsAcceptedAt?: Date;

  @Column({ default: false })
  isProvider: boolean;

  @Column({ nullable: true })
  lastLoggedInAt?: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Provider, (provider) => provider.user, { eager: true })
  providers: Provider[];
}
