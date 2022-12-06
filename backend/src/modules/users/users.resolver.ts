import {
  BadRequestException,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProviderDto } from '../providers/dtos/provider.dto';
import { Provider } from '../providers/provider.entity';
import { ProvidersService } from '../providers/providers.service';
import { RoleDto } from '../roles/dtos/role.dto';
import { RolesService } from '../roles/roles.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ActiveUserDto } from './dtos/active-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginResponeDto } from './dtos/login-response.dto';
import { LoginUserInput } from './dtos/login-user-input.dto';
import { SearchUserDto } from './dtos/search-user.dto';
import { UserDto } from './dtos/user.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(RolesService) private rolesService: RolesService,
    @Inject(ProvidersService) private providersService: ProvidersService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  @Query((returns) => UserDto)
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  me(@Context() context) {
    return context.req.user as User;
  }

  @Query((returns) => UserDto, { nullable: true })
  @Serialize(UserDto)
  user(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [UserDto])
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  async createUser(
    @Args('user') user: CreateUserDto,
    @CurrentUser() currentLoggedInUser: User,
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

    const userDetails = await this.usersService.create(
      user,
      role,
      currentLoggedInUser,
    );

    if (provider && user.providerId && role.code.toLowerCase() === 'provider') {
      await this.providersService.linkUserAccountToProvider(
        provider.id,
        userDetails,
        currentLoggedInUser,
      );
    }

    return userDetails;
  }

  @Mutation((returns) => UserDto)
  @Serialize(UserDto)
  async activeUser(@Args('user') user: ActiveUserDto) {
    return this.usersService.activateUserAccount(user);
  }

  @Mutation((returns) => LoginResponeDto)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const user = context.user as User;

    if (!user.isActive) {
      throw new NotFoundException('User account is not active.');
    }

    const token = this._createToken(user);

    return {
      ...token,
      user,
    };
  }

  private _createToken({
    id,
    email,
    firstName,
    lastName,
    isProvider,
    isActive,
  }: User): any {
    const accessToken = this.jwtService.sign({
      sno: id,
      user: { firstName, lastName, email, isActive, isProvider },
    });
    return {
      accessToken,
    };
  }
}
