import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { Provider } from './provider.entity';

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private repo: Repository<Provider>) {}

  findAll() {
    return this.repo.find();
  }

  findOneByUserId(userId: number) {
    return this.repo.findOne({ where: { user: { id: userId } } });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.repo.findOneBy({ id });
  }

  create({ name, group, brighttreeId }: CreateProviderDto, user: User) {
    const provider = this.repo.create({
      name,
      group,
      brighttreeId,
      createdBy: `${user.lastName}, ${user.firstName}`,
    });

    return this.repo.save(provider);
  }

  async linkUserAccountToProvider(id: number, user: User, updatedBy: User) {
    const provider = await this.findOne(id);
    provider.user = user;
    provider.updatedBy = `${updatedBy.lastName}, ${updatedBy.firstName}`;
    provider.updatedAt = new Date();
    return this.repo.save(provider);
  }

  async deLinkUserAccountToProvider(id: number, updatedBy: User) {
    const provider = await this.findOne(id);
    provider.user = null;
    provider.updatedBy = `${updatedBy.lastName}, ${updatedBy.firstName}`;
    provider.updatedAt = new Date();
    return this.repo.save(provider);
  }

  async remove(providers: Provider[]) {
    return this.repo.remove(providers);
  }
}
