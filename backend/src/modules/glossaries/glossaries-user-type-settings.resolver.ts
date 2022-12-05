import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateGlossaryUserTypeSettingDto } from './dtos/cretae-glossary-user-type-setting.dto';
import { GlossaryUserTypeSettingDto } from './dtos/glossary-user-type-setting.dto';
import { UpdateGlossaryUserTypeSettingDto } from './dtos/update-glossary-user-type-setting.dto';
import { GlossariesUserTypeSettingsService } from './glossaries-user-type-settings.service';

@Resolver((of) => GlossaryUserTypeSettingDto)
export class GlossariesUserTypeSettingsResolver {
  constructor(
    @Inject(GlossariesUserTypeSettingsService)
    private service: GlossariesUserTypeSettingsService,
  ) {}

  @Query((returns) => [GlossaryUserTypeSettingDto])
  @Serialize(GlossaryUserTypeSettingDto)
  userTypeSettings() {
    return this.service.findAll();
  }

  @Query((returns) => [GlossaryUserTypeSettingDto], { nullable: true })
  @Serialize(GlossaryUserTypeSettingDto)
  userTypeSetting(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Mutation((returns) => GlossaryUserTypeSettingDto)
  @Serialize(GlossaryUserTypeSettingDto)
  createUserTypeSetting(
    @Args('userTypeSetting') userTypeSetting: CreateGlossaryUserTypeSettingDto,
    @CurrentUser() user: User,
  ) {
    return this.service.create(userTypeSetting, user);
  }

  @Mutation((returns) => GlossaryUserTypeSettingDto)
  @Serialize(GlossaryUserTypeSettingDto)
  async updateUserTypeSetting(
    @Args('userTypeSetting')
    userTypeSettingDto: UpdateGlossaryUserTypeSettingDto,
    @CurrentUser() user: User,
  ) {
    return this.service.update(userTypeSettingDto.id, userTypeSettingDto, user);
  }
}
