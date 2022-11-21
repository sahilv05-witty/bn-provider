import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
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
}
