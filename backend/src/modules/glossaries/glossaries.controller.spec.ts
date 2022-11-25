import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesController } from './glossaries.controller';

describe('GlossariesController', () => {
  let controller: GlossariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlossariesController],
    }).compile();

    controller = module.get<GlossariesController>(GlossariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
