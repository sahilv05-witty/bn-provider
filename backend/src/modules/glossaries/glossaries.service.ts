import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateGlossaryDto } from './dtos/create-glossary.dto';
import { SearchGlossaryDto } from './dtos/search-glossary.dto';
import { UpdateGlossaryDto } from './dtos/update-glossary.dto';
import { Glossary } from './glossary.entity';

@Injectable()
export class GlossariesService {
  constructor(
    @InjectRepository(Glossary)
    private repo: Repository<Glossary>,
  ) {}

  findAll(searchDto?: Partial<SearchGlossaryDto>) {
    if (!searchDto) {
      return this.repo.find();
    }

    return this.repo.findBy({ ...searchDto });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  create(
    { name, code, description, type }: CreateGlossaryDto,
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
    args: Partial<UpdateGlossaryDto>,
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
