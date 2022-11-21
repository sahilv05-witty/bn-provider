import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/role.entity';
import { ActiveUserDto } from './dtos/active-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  findAllByRoleId(roleId: number) {
    return this.repo.find({ where: { role: { id: roleId } } });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async update(id: number, args: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, args);

    return this.repo.save(user);
  }

  async activateUserAccount(id: number, activeUserDto: ActiveUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, activeUserDto);
    user.isActive = true;
    user.updatedAt = user.termsAcceptedAt = new Date();
    user.updatedBy = `${user.lastName}, ${user.firstName}`;

    return this.repo.save(user);
  }

  // Similarly add other methods
  create(
    { firstName, lastName, email }: CreateUserDto,
    role: Role,
    currentUser: User,
  ) {
    const isProvider = role.code == 'Provider';

    const user = this.repo.create({
      createdBy: `${currentUser.lastName}, ${currentUser.firstName}`,
      firstName,
      lastName,
      email,
      isProvider,
    });

    user.role = role;

    return this.repo.save(user);
  }

  async remove(user: User) {
    return this.repo.remove(user);
  }
}
