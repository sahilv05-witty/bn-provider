import { Test, TestingModule } from '@nestjs/testing';
import { UserStateGlossariesController } from './user-state-glossaries.controller';

describe('UserStateGlossariesController', () => {
  let controller: UserStateGlossariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStateGlossariesController],
    }).compile();

    controller = module.get<UserStateGlossariesController>(
      UserStateGlossariesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
