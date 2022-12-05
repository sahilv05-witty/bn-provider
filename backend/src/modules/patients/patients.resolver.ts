import { Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GlossaryDto } from '../glossaries/dtos/glossary.dto';
import { GlossariesPatientStatusService } from '../glossaries/glossaries-patient-status.service';
import { GlossariesUserTypeSettingsService } from '../glossaries/glossaries-user-type-settings.service';
import { ProviderDto } from '../providers/dtos/provider.dto';
import { ProvidersService } from '../providers/providers.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { PatientDto } from './dtos/patient.dto';
import { UpdatePatientDto } from './dtos/update-patient-status.dto';
import { PatientsService } from './patients.service';

@Resolver((of) => PatientDto)
export class PatientsResolver {
  constructor(
    @Inject(PatientsService) private patientsService: PatientsService,
    @Inject(GlossariesPatientStatusService)
    private patientStatusesService: GlossariesPatientStatusService,
    @Inject(GlossariesUserTypeSettingsService)
    private userTypeSettingsService: GlossariesUserTypeSettingsService,
    @Inject(ProvidersService) private providerService: ProvidersService,
  ) {}

  @Query((returns) => [PatientDto])
  @Serialize(PatientDto)
  async patients(@Args('providerId', { nullable: true }) providerId: number) {
    let provider;

    if (providerId) {
      provider = await this.providerService.findOne(providerId);

      if (!provider) {
        throw new NotFoundException('Provider not found');
      }
    }

    return await this.patientsService.findAll(provider);
  }

  @Query((returns) => PatientDto, { nullable: true })
  @Serialize(PatientDto)
  patient(@Args('id') id: number) {
    return this.patientsService.findOne(id);
  }

  @Query((returns) => GlossaryDto)
  @Serialize(GlossaryDto)
  service(@Parent() patient) {
    const { service } = patient;
    return this.userTypeSettingsService.findOne(service.id);
  }

  @Query((returns) => GlossaryDto)
  @Serialize(GlossaryDto)
  status(@Parent() patient) {
    const { status } = patient;
    return this.patientStatusesService.findOne(status.id);
  }

  @Query((returns) => ProviderDto)
  @Serialize(ProviderDto)
  provider(@Parent() patient) {
    const { provider } = patient;
    return this.providerService.findOne(provider.id);
  }

  @Mutation((returns) => PatientDto)
  @Serialize(PatientDto)
  async createPatient(
    @Args('patient') patient: CreatePatientDto,
    @CurrentUser() user: User,
  ) {
    const service = await this.userTypeSettingsService.findOne(
      patient.serviceId,
    );

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const status = await this.patientStatusesService.findOne(patient.statusId);

    if (!status) {
      throw new NotFoundException('Patient Status not found');
    }

    const provider = await this.providerService.findOne(patient.providerId);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.patientsService.create(
      patient,
      service,
      status,
      provider,
      user,
    );
  }

  @Mutation((returns) => PatientDto)
  @Serialize(PatientDto)
  async updatePatientStatus(
    @Args('patient') patient: UpdatePatientDto,
    @CurrentUser() user: User,
  ) {
    const patientDetails = await this.patientsService.findOne(patient.id);

    if (!patientDetails) {
      throw new NotFoundException('Patient not found');
    }

    const status = await this.patientStatusesService.findOne(patient.statusId);

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    patientDetails.status = status;

    return this.patientsService.updateStatus(patientDetails, user);
  }
}
