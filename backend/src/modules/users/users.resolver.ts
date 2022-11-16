import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Query((returns) => User)
  async user(@Args('id') id: string) {
    return await this.usersService.findOne(parseInt(id));
  }

  @Query((returns) => [User])
  async users() {
    return await this.usersService.findAll();
  }
}
