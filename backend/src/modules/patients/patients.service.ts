import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserStateGlossary } from '../userStateGlossaries/user-state-glossary.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private repo: Repository<Patient>) {}
  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.repo.findOneBy({ id });
  }

  create(
    {
      firstName,
      lastName,
      dateOfBirth,
      betterNightId,
      brighttreeNumber,
    }: Partial<CreatePatientDto>,
    entryPoint: UserStateGlossary,
    currentPathway: UserStateGlossary,
    status: UserStateGlossary,
    user: User,
  ) {
    const provider = this.repo.create({
      firstName,
      lastName,
      dateOfBirth,
      brighttreeNumber,
      betterNightId,
      entryPoint: entryPoint,
      currentPathway: currentPathway,
      status: status,
      createdBy: `${user.lastName}, ${user.firstName}`,
    });

    return this.repo.save(provider);
  }
}
