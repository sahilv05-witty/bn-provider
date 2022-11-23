import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateUserStateGlossaryDto } from './dtos/create-user-state-glossary.dto';
import { UpdateUserStateGlossaryDto } from './dtos/update-user-state-glossary.dto';
import { UserStateGlossary } from './user-state-glossary.entity';

@Injectable()
export class UserStateGlossariesService {
  constructor(
    @InjectRepository(UserStateGlossary)
    private repo: Repository<UserStateGlossary>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  create(
    { name, code, description, type }: CreateUserStateGlossaryDto,
    { firstName, lastName }: User,
  ) {
    const role = this.repo.create({
      code,
      name,
      description,
      type,
      createdBy: `${lastName}, ${firstName}`,
    });

    return this.repo.save(role);
  }

  async update(
    args: Partial<UpdateUserStateGlossaryDto>,
    { firstName, lastName }: User,
  ) {
    const reference = await this.findOne(args.id);

    if (!reference) {
      throw new Error('User state glossary not found');
    }

    Object.assign(reference, args, { updatedBy: `${lastName}, ${firstName}` });

    return this.repo.save(reference);
  }
}
