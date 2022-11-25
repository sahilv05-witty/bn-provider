import { Inject, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Parent } from '@nestjs/graphql';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GlossaryDto } from '../glossaries/dtos/glossary.dto';
import { GlossariesService } from '../glossaries/glossaries.service';
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
    @Inject(GlossariesService) private glossariesService: GlossariesService,
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
  entryPoint(@Parent() patient) {
    const { entryPoint } = patient;
    return this.glossariesService.findOne(entryPoint.id);
  }

  @Query((returns) => GlossaryDto)
  @Serialize(GlossaryDto)
  currentPathway(@Parent() patient) {
    const { currentPathway } = patient;
    return this.glossariesService.findOne(currentPathway.id);
  }

  @Query((returns) => GlossaryDto)
  @Serialize(GlossaryDto)
  status(@Parent() patient) {
    const { status } = patient;
    return this.glossariesService.findOne(status.id);
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
    const entryPoint = await this.glossariesService.findOne(
      patient.entryPointId,
    );

    if (!entryPoint) {
      throw new NotFoundException('Entrypoint not found');
    }

    const currentPathway = await this.glossariesService.findOne(
      patient.currentPathwayId,
    );

    if (!currentPathway) {
      throw new NotFoundException('Current Pathway not found');
    }

    const status = await this.glossariesService.findOne(patient.statusId);

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const provider = await this.providerService.findOne(patient.providerId);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.patientsService.create(
      patient,
      entryPoint,
      currentPathway,
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

    const status = await this.glossariesService.findOne(patient.statusId);

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    patientDetails.status = status;

    return this.patientsService.updateStatus(patientDetails, user);
  }
}
