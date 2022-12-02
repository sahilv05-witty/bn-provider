import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesPatientStatusResolver } from './glossaries-patient-status.resolver';

describe('GlossariesPatientStatusResolver', () => {
  let resolver: GlossariesPatientStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlossariesPatientStatusResolver],
    }).compile();

    resolver = module.get<GlossariesPatientStatusResolver>(
      GlossariesPatientStatusResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
