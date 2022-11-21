import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProviderDto } from '../providers/dtos/provider.dto';
import { ProvidersService } from '../providers/providers.service';
import { RoleDto } from '../roles/dtos/role.dto';
import { RolesService } from '../roles/roles.service';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(RolesService) private rolesService: RolesService,
    @Inject(ProvidersService) private providersService: ProvidersService,
  ) {}

  @Query((returns) => UserDto)
  @Serialize(UserDto)
  user(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [UserDto])
  @Serialize(UserDto)
  users() {
    return this.usersService.findAll();
  }

  @ResolveField((returns) => RoleDto)
  @Serialize(RoleDto)
  role(@Parent() user) {
    const { role } = user;
    return this.rolesService.findOne(role.id);
  }

  @ResolveField((returns) => [ProviderDto])
  @Serialize(ProviderDto)
  providers(@Parent() user) {
    const { id } = user;
    return this.providersService.findAllByUserId(id);
  }
}
