import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientsResolver } from './patients.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { GlossariesModule } from '../glossaries/glossaries.module';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    GlossariesModule,
    ProvidersModule,
  ],
  providers: [PatientsService, PatientsResolver],
  controllers: [PatientsController],
})
export class PatientsModule {}
