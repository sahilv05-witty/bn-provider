import { Test, TestingModule } from '@nestjs/testing';
import { UserStateGlossariesResolver } from './user-state-glossaries.resolver';

describe('UserStateGlossariesResolver', () => {
  let resolver: UserStateGlossariesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStateGlossariesResolver],
    }).compile();

    resolver = module.get<UserStateGlossariesResolver>(
      UserStateGlossariesResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
