import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Console } from 'console';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateReferenceDto } from './dtos/create-reference.dto';
import { ReferenceDto } from './dtos/reference.dto';
import { UpdateReferenceDto } from './dtos/update-reference.dto';
import { ReferencesService } from './references.service';

@Resolver((of) => ReferenceDto)
export class ReferencesResolver {
  constructor(
    @Inject(ReferencesService) private referencesService: ReferencesService,
  ) {}

  @Query((returns) => ReferenceDto, { nullable: true })
  reference(@Args('id') id: number) {
    return this.referencesService.findOne(id);
  }

  @Query((returns) => [ReferenceDto])
  references() {
    return this.referencesService.findAll();
  }

  @Mutation((returns) => ReferenceDto)
  createReference(
    @Args('reference') reference: CreateReferenceDto,
    @CurrentUser() user: User,
  ) {
    return this.referencesService.create(reference, user);
  }

  @Mutation((returns) => ReferenceDto)
  updateReference(
    @Args('reference') reference: UpdateReferenceDto,
    @CurrentUser() user: User,
  ) {
    return this.referencesService.update(reference, user);
  }
}
