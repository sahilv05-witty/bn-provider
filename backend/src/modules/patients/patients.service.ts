import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlossaryPatientStatus } from '../glossaries/glossary-patient-status.entity';
import { GlossaryUserTypeSetting } from '../glossaries/glossary-user-type-setting.entity';
import { Glossary } from '../glossaries/glossary.entity';
import { Provider } from '../providers/provider.entity';
import { User } from '../users/user.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Patient } from './patient.entity';

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
      entryPoint,
      pathway,
      state,
      skipHST,
      isFollowupAllowed,
    }: Partial<CreatePatientDto>,
    service: GlossaryUserTypeSetting,
    status: GlossaryPatientStatus,
    provider: Provider,
    user: User,
  ) {
    const patient = this.repo.create({
      firstName,
      lastName,
      dateOfBirth,
      brighttreeNumber,
      betterNightId,
      entryPoint,
      pathway,
      state,
      skipHST,
      isFollowupAllowed,
      service,
      status,
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
