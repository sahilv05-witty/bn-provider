import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserDto } from '../users/dtos/user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleDto } from './dtos/role.dto';
import { RolesService } from './roles.service';

@Resolver((of) => RoleDto)
export class RolesResolver {
  constructor(
    @Inject(RolesService) private rolesService: RolesService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Query((returns) => RoleDto, { nullable: true })
  role(@Args('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Query((returns) => [RoleDto], { nullable: true })
  roles() {
    return this.rolesService.findAll();
  }

  @ResolveField((returns) => [UserDto])
  @Serialize(UserDto)
  users(@Parent() role) {
    const { id } = role;
    return this.usersService.findAllByRoleId(id);
  }

  @Mutation((returns) => RoleDto)
  createRole(@Args('role') role: CreateRoleDto, @CurrentUser() user: User) {
    return this.rolesService.create(role, user);
  }
}
