import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateGlossaryDto } from './dtos/create-glossary.dto';
import { UpdateGlossaryDto } from './dtos/update-glossary.dto';
import { GlossaryDto } from './dtos/glossary.dto';
import { GlossariesService } from './glossaries.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Resolver((of) => GlossaryDto)
export class GlossariesResolver {
  constructor(
    @Inject(GlossariesService)
    private GlossariesService: GlossariesService,
  ) {}

  @Query((returns) => GlossaryDto, { nullable: true })
  @Serialize(GlossaryDto)
  glossary(@Args('id') id: number) {
    return this.GlossariesService.findOne(id);
  }

  @Query((returns) => [GlossaryDto])
  @Serialize(GlossaryDto)
  glossaries() {
    return this.GlossariesService.findAll();
  }

  @Mutation((returns) => GlossaryDto)
  @Serialize(GlossaryDto)
  createGlossary(
    @Args('glossary')
    createGlossary: CreateGlossaryDto,
    @CurrentUser() user: User,
  ) {
    return this.GlossariesService.create(createGlossary, user);
  }

  @Mutation((returns) => GlossaryDto)
  @Serialize(GlossaryDto)
  updateGlossary(
    @Args('reference') reference: UpdateGlossaryDto,
    @CurrentUser() user: User,
  ) {
    return this.GlossariesService.update(reference, user);
  }
}
