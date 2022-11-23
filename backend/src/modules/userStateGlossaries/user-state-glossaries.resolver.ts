import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateUserStateGlossaryDto } from './dtos/create-user-state-glossary.dto';
import { UpdateUserStateGlossaryDto } from './dtos/update-user-state-glossary.dto';
import { UserStateGlossaryDto } from './dtos/user-state-glossary.dto';
import { UserStateGlossariesService } from './user-state-glossaries.service';

@Resolver((of) => UserStateGlossaryDto)
export class UserStateGlossariesResolver {
  constructor(
    @Inject(UserStateGlossariesService)
    private userStateGlossariesService: UserStateGlossariesService,
  ) {}

  @Query((returns) => UserStateGlossaryDto, { nullable: true })
  userStateGlossary(@Args('id') id: number) {
    return this.userStateGlossariesService.findOne(id);
  }

  @Query((returns) => [UserStateGlossaryDto])
  userStateGlossaries() {
    return this.userStateGlossariesService.findAll();
  }

  @Mutation((returns) => UserStateGlossaryDto)
  createUserStateGlossary(
    @Args('createUserStateGlossary')
    createUserStateGlossary: CreateUserStateGlossaryDto,
    @CurrentUser() user: User,
  ) {
    return this.userStateGlossariesService.create(
      createUserStateGlossary,
      user,
    );
  }

  @Mutation((returns) => UserStateGlossaryDto)
  updateUserStateGlossary(
    @Args('reference') reference: UpdateUserStateGlossaryDto,
    @CurrentUser() user: User,
  ) {
    return this.userStateGlossariesService.update(reference, user);
  }
}
