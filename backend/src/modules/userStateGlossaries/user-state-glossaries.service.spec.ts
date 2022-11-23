import { Test, TestingModule } from '@nestjs/testing';
import { UserStateGlossariesService } from './user-state-glossaries.service';

describe('UserStateGlossariesService', () => {
  let service: UserStateGlossariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStateGlossariesService],
    }).compile();

    service = module.get<UserStateGlossariesService>(
      UserStateGlossariesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
