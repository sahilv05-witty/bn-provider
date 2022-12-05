import { Module } from '@nestjs/common';
import { GlossariesResolver } from './glossaries.resolver';
import { GlossariesController } from './glossaries.controller';
import { GlossariesService } from './glossaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossary } from './glossary.entity';
import { GlossaryPatientStatus } from './glossary-patient-status.entity';
import { GlossariesPatientStatusService } from './glossaries-patient-status.service';
import { GlossariesPatientStatusResolver } from './glossaries-patient-status.resolver';
import { GlossariesUserTypeSettingsResolver } from './glossaries-user-type-settings.resolver';
import { GlossariesUserTypeSettingsService } from './glossaries-user-type-settings.service';
import { GlossaryUserTypeSetting } from './glossary-user-type-setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Glossary,
      GlossaryPatientStatus,
      GlossaryUserTypeSetting,
    ]),
  ],
  providers: [
    GlossariesService,
    GlossariesPatientStatusService,
    GlossariesUserTypeSettingsService,
    GlossariesResolver,
    GlossariesPatientStatusResolver,
    GlossariesUserTypeSettingsResolver,
  ],
  controllers: [GlossariesController],
  exports: [
    GlossariesService,
    GlossariesPatientStatusService,
    GlossariesUserTypeSettingsService,
  ],
})
export class GlossariesModule {}
