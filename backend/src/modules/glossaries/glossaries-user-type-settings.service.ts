import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateGlossaryUserTypeSettingDto } from './dtos/cretae-glossary-user-type-setting.dto';
import { UpdateGlossaryUserTypeSettingDto } from './dtos/update-glossary-user-type-setting.dto';
import { GlossaryUserTypeSetting } from './glossary-user-type-setting.entity';

@Injectable()
export class GlossariesUserTypeSettingsService {
  constructor(
    @InjectRepository(GlossaryUserTypeSetting)
    private repo: Repository<GlossaryUserTypeSetting>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  find(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(
    {
      entryPoint,
      initialState,
      skipHST,
      isFollowupAllowed,
      service,
      serviceDefinition,
    }: CreateGlossaryUserTypeSettingDto,
    { firstName, lastName }: User,
  ) {
    const userTypeSetting = this.repo.create({
      entryPoint,
      initialState,
      skipHST,
      isFollowupAllowed,
      service,
      serviceDefinition,
      createdBy: `${lastName}, ${firstName}`,
    });

    return this.repo.save(userTypeSetting);
  }

  async update(
    id: number,
    userTypeSettingDto: UpdateGlossaryUserTypeSettingDto,
    { firstName, lastName }: User,
  ) {
    const userTypeSetting = await this.find(id);

    if (!userTypeSetting) {
      throw new NotFoundException('User type setting glossary not found');
    }

    Object.assign(userTypeSetting, userTypeSettingDto);
    userTypeSetting.updatedBy = `${lastName}, ${firstName}`;

    return this.repo.save(userTypeSetting);
  }
}
