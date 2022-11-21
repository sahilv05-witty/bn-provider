import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { ProviderDto } from './dtos/provider.dto';
import { ProvidersService } from './providers.service';

@Resolver((of) => ProviderDto)
export class ProvidersResolver {
  constructor(
    @Inject(ProvidersService) private providersService: ProvidersService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Query((returns) => ProviderDto, { nullable: true })
  provider(@Args('id') id: number) {
    return this.providersService.findOne(id);
  }

  @Query((returns) => [ProviderDto], { nullable: true })
  providers() {
    return this.providersService.findAll();
  }

  @ResolveField((returns) => UserDto)
  @Serialize(UserDto)
  user(@Parent() provider) {
    const { user } = provider;
    return this.usersService.findOne(user.id);
  }
}
