import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesResolver } from './glossaries.resolver';

describe('GlossariesResolver', () => {
  let resolver: GlossariesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlossariesResolver],
    }).compile();

    resolver = module.get<GlossariesResolver>(GlossariesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
