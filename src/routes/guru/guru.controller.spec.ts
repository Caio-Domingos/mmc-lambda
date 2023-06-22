import { Test, TestingModule } from '@nestjs/testing';
import { GuruController } from './guru.controller';
import { GuruService } from './guru.service';

describe('GuruController', () => {
  let controller: GuruController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuruController],
      providers: [GuruService],
    }).compile();

    controller = module.get<GuruController>(GuruController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
