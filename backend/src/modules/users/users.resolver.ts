import { BadRequestException, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProviderDto } from '../providers/dtos/provider.dto';
import { Provider } from '../providers/provider.entity';
import { ProvidersService } from '../providers/providers.service';
import { RoleDto } from '../roles/dtos/role.dto';
import { RolesService } from '../roles/roles.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ActiveUserDto } from './dtos/active-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { SearchUserDto } from './dtos/search-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(RolesService) private rolesService: RolesService,
    @Inject(ProvidersService) private providersService: ProvidersService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  @Query((returns) => UserDto, { nullable: true })
  @Serialize(UserDto)
  user(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Query((returns) => [UserDto])
  @Serialize(UserDto)
  users(@Args('searchUser', { nullable: true }) searchUser?: SearchUserDto) {
    return this.usersService.findAll(searchUser);
  }

  validateActivationLink(
    @Args('accountActivationLink') accountActivationLink: string,
  ) {}

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
    return result;
  }

  @Mutation((returns) => UserDto)
  @Serialize(UserDto)
  async createUser(
    @Args('user') user: CreateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    const role = await this.rolesService.findOne(user.roleId);

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    let provider: Provider = null;

    if (user.providerId) {
      provider = await this.providersService.findOne(user.providerId);

      if (!provider) {
        throw new NotFoundException('Provider not found.');
      }
    }

    if (role.code.toLowerCase() !== 'provider' && provider) {
      throw new BadRequestException(
        `${provider.name} (${user.firstName} ${user.lastName}) cannot be mapped to the ${role.name}`,
      );
    }

    const userDetails = await this.usersService.create(user, role, currentUser);

    if (provider && user.providerId && role.code.toLowerCase() === 'provider') {
      await this.providersService.linkUserAccountToProvider(
        provider.id,
        userDetails,
        currentUser,
      );
    }

    return userDetails;
  }

  @Mutation((returns) => UserDto)
  @Serialize(UserDto)
  async activeUser(@Args('user') user: ActiveUserDto) {
    const userDetails = await this.usersService.findOne(user.id);

    if (!userDetails) {
      throw new NotFoundException('User not found');
    }

    Object.assign(userDetails, user);

    return this.usersService.activateUserAccount(userDetails);
  }

  @Mutation((returns) => UserDto)
  @Serialize(UserDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const userDetails = await this.usersService.login(email, password);

    if (!userDetails) {
      throw new NotFoundException('User not found');
    }

    if (!userDetails.isActive) {
      throw new NotFoundException('User account is not active.');
    }

    const user = this.usersService.update(userDetails.id, {
      lastLoggedInAt: new Date(),
    });

    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
