import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) {}

  create(
    { name, code, description }: CreateRoleDto,
    { firstName, lastName }: User,
  ) {
    const role = this.repo.create({
      code,
      name,
      description,
      createdBy: `${lastName}, ${firstName}`,
    });

    return this.repo.save(role);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.repo.findOne({ where: { id } });
  }

  findAll(isActive?: boolean) {
    if (isActive !== undefined) {
      return this.repo.find({ where: { isActive } });
    }

    return this.repo.find();
  }
}
