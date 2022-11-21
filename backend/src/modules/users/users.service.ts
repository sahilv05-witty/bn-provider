import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/role.entity';
import { RolesService } from '../roles/roles.service';
import { ActiveUserDto } from './dtos/active-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserRoleDto } from './dtos/update-user-role.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @Inject(RolesService) private rolesService: RolesService,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  findAllByRoleId(roleId: number) {
    return this.usersRepo.find({ where: { role: { id: roleId } } });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.usersRepo.findOne({ where: { id } });
  }

  async update(id: number, args: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, args);

    return this.usersRepo.save(user);
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

    return this.usersRepo.save(user);
  }

  async updateUserRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
    currentUser: User,
  ) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.rolesService.findOne(updateUserRoleDto.roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    Object.assign(user, updateUserRoleDto);
    user.role = role;
    user.updatedAt = new Date();
    user.updatedBy = `${currentUser.lastName}, ${currentUser.firstName}`;

    return this.usersRepo.save(user);
  }

  // Similarly add other methods
  create(
    { firstName, lastName, email }: CreateUserDto,
    role: Role,
    currentUser: User,
  ) {
    const isProvider = role.code == 'Provider';

    const user = this.usersRepo.create({
      createdBy: `${currentUser.lastName}, ${currentUser.firstName}`,
      firstName,
      lastName,
      email,
      isProvider,
    });

    user.role = role;

    return this.usersRepo.save(user);
  }

  async remove(user: User) {
    return this.usersRepo.remove(user);
  }
}
