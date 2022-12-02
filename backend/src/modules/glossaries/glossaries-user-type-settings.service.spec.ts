import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesUserTypeSettingsService } from './glossaries-user-type-settings.service';

describe('GlossariesUserTypeSettingsService', () => {
  let service: GlossariesUserTypeSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlossariesUserTypeSettingsService],
    }).compile();

    service = module.get<GlossariesUserTypeSettingsService>(
      GlossariesUserTypeSettingsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
