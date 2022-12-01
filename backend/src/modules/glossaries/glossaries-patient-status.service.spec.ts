import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesPatientStatusService } from './glossaries-patient-status.service';

describe('GlossariesPatientStatusService', () => {
  let service: GlossariesPatientStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlossariesPatientStatusService],
    }).compile();

    service = module.get<GlossariesPatientStatusService>(GlossariesPatientStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
