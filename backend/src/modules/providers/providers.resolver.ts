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
import { CreateProviderDto } from './dtos/create-provider.dto';
import { ProviderDto } from './dtos/provider.dto';
import { SearchProviderDto } from './dtos/search-provider.dto';
import { ProvidersService } from './providers.service';

@Resolver((of) => ProviderDto)
export class ProvidersResolver {
  constructor(
    @Inject(ProvidersService) private providersService: ProvidersService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Query((returns) => ProviderDto, { nullable: true })
  @Serialize(ProviderDto)
  provider(@Args('id') id: number) {
    return this.providersService.findOne(id);
  }

  @Query((returns) => [ProviderDto], { nullable: true })
  @Serialize(ProviderDto)
  providers(
    @Args('searchProvider', { nullable: true })
    searchProvider: SearchProviderDto,
  ) {
    return this.providersService.findAll(searchProvider);
  }

  @ResolveField((returns) => UserDto)
  @Serialize(UserDto)
  user(@Parent() provider) {
    const { user } = provider;

    if (!user) {
      return null;
    }

    return this.usersService.findOne(user.id);
  }

  @Mutation((returns) => ProviderDto)
  @Serialize(ProviderDto)
  createProvider(
    @Args('provider') provider: CreateProviderDto,
    @CurrentUser() user: User,
  ) {
    return this.providersService.create(provider, user);
  }
}
