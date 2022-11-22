import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateReferenceDto } from './dtos/create-reference.dto';
import { UpdateReferenceDto } from './dtos/update-reference.dto';
import { Reference } from './reference.entity';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectRepository(Reference) private repo: Repository<Reference>,
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
    { name, code, description, type }: CreateReferenceDto,
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
    args: Partial<UpdateReferenceDto>,
    { firstName, lastName }: User,
  ) {
    const reference = await this.findOne(args.id);

    if (!reference) {
      throw new Error('Reference not found');
    }

    Object.assign(reference, args, { updatedBy: `${lastName}, ${firstName}` });

    return this.repo.save(reference);
  }
}
