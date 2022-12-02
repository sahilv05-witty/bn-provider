import { Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateGlossaryPatientStatusDto } from './dtos/create-glossary-patient-status.dto';
import { GlossaryPatientStatusDto } from './dtos/glossary-patient-status.dto';
import { UpdateGlossaryPatientStatusDto } from './dtos/update-glossary-patient-status.dto';
import { GlossariesPatientStatusService } from './glossaries-patient-status.service';

@Resolver((of) => GlossaryPatientStatusDto)
export class GlossariesPatientStatusResolver {
  constructor(
    @Inject(GlossariesPatientStatusService)
    private service: GlossariesPatientStatusService,
  ) {}

  @Query((returns) => [GlossaryPatientStatusDto])
  @Serialize(GlossaryPatientStatusDto)
  patientStatuses() {
    return this.service.findAll();
  }

  @Query((returns) => [GlossaryPatientStatusDto], { nullable: true })
  @Serialize(GlossaryPatientStatusDto)
  patientStatus(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Mutation((returns) => GlossaryPatientStatusDto)
  @Serialize(GlossaryPatientStatusDto)
  createPatientStatus(
    @Args('patientStatus') patientStatus: CreateGlossaryPatientStatusDto,
    @CurrentUser() user: User,
  ) {
    return this.service.create(patientStatus, user);
  }

  @Mutation((returns) => GlossaryPatientStatusDto)
  @Serialize(GlossaryPatientStatusDto)
  async updatePatientStatus(
    @Args('patientStatus') patientStatusDto: UpdateGlossaryPatientStatusDto,
    @CurrentUser() user: User,
  ) {
    return this.service.update(patientStatusDto.id, patientStatusDto, user);
  }
}
