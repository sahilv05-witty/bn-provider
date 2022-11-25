import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Glossary } from '../glossaries/glossary.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Patient } from './patient.entity';
import { Provider } from '../providers/provider.entity';

import {} from 'lodash';
import { UpdatePatientDto } from './dtos/update-patient-status.dto';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private repo: Repository<Patient>) {}
  async findAll(provider?: Provider) {
    console.log(JSON.stringify(provider));
    if (provider) {
      // Get provider patients and their provider group patients

      // Get Provider Patients
      const providerPatients = await this.repo.find({
        where: { provider: { id: provider.id } },
      });

      if (provider.group) {
        const providerGroupPatients = await this.repo.find({
          where: { provider: { group: provider.group } },
        });

        const providerPatientsIds = new Set(providerPatients.map((d) => d.id));
        const providerGroupProviderPatients = [
          ...providerPatients,
          ...providerGroupPatients.filter(
            (d) => !providerPatientsIds.has(d.id),
          ),
        ];

        return providerGroupProviderPatients;
      }

      return providerPatients;
    }

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
      statusDate,
    }: Partial<CreatePatientDto>,
    entryPoint: Glossary,
    currentPathway: Glossary,
    status: Glossary,
    provider: Provider,
    user: User,
  ) {
    const patient = this.repo.create({
      firstName,
      lastName,
      dateOfBirth,
      brighttreeNumber,
      betterNightId,
      entryPoint: entryPoint,
      currentPathway: currentPathway,
      status: status,
      statusDate,
      provider,
      createdBy: `${user.lastName}, ${user.firstName}`,
    });

    return this.repo.save(patient);
  }

  updateStatus(patient: Patient, user: User) {
    patient.updatedBy = `${user.lastName}, ${user.firstName}`;
    return this.repo.save(patient);
  }
}
