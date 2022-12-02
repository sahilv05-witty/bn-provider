import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePatientDto } from '../patients/dtos/update-patient-status.dto';
import { User } from '../users/user.entity';
import { CreateGlossaryPatientStatusDto } from './dtos/create-glossary-patient-status.dto';
import { UpdateGlossaryPatientStatusDto } from './dtos/update-glossary-patient-status.dto';
import { GlossaryPatientStatus } from './glossary-patient-status.entity';

@Injectable()
export class GlossariesPatientStatusService {
  constructor(
    @InjectRepository(GlossaryPatientStatus)
    private repo: Repository<GlossaryPatientStatus>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(
    {
      beId,
      beState,
      description,
      dataSource,
      pathway,
      patientStatus,
      patientStatusDefinition,
    }: CreateGlossaryPatientStatusDto,
    { firstName, lastName }: User,
  ) {
    const glossaryPatientStatus = this.repo.create({
      beId,
      beState,
      description,
      dataSource,
      pathway,
      patientStatus,
      patientStatusDefinition,
      createdBy: `${lastName}, ${firstName}`,
    });

    return this.repo.save(glossaryPatientStatus);
  }

  async update(
    id: number,
    patientStatusDto: UpdateGlossaryPatientStatusDto,
    { firstName, lastName }: User,
  ) {
    const patientStatus = await this.findOne(id);

    if (!patientStatus) {
      throw new NotFoundException('Patient status glossary not found');
    }

    Object.assign(patientStatus, patientStatusDto);
    patientStatus.updatedBy = `${lastName}, ${firstName}`;

    return this.repo.save(patientStatus);
  }
}
