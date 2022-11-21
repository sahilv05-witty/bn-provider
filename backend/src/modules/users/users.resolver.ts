import { Inject, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProviderDto } from '../providers/dtos/provider.dto';
import { ProvidersService } from '../providers/providers.service';
import { RoleDto } from '../roles/dtos/role.dto';
import { RolesService } from '../roles/roles.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
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

  @ResolveField((returns) => ProviderDto)
  @Serialize(ProviderDto)
  async provider(@Parent() user) {
    const { id } = user;
    const result = await this.providersService.findOneByUserId(id);
    console.log('Provider called', result);
    return result;
  }

  @Mutation((returns) => UserDto)
  async createUser(
    @Args('user') createUser: CreateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    const role = await this.rolesService.findOne(createUser.roleId);

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    let provider = null;

    if (!createUser.providerId && role.code === 'provider') {
      provider = await this.providersService.findOne(createUser.providerId);

      if (!provider) {
        throw new NotFoundException('Provider not found.');
      }
    }

    const user = await this.usersService.create(createUser, role, currentUser);

    if (provider && createUser.providerId && role.code === 'provider') {
      await this.providersService.linkUserAccountToProvider(
        provider.id,
        user,
        currentUser,
      );
    }

    return user;
  }
}
