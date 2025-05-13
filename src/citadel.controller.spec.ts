import { Test, TestingModule } from '@nestjs/testing';
import { CitadelController } from './citadel.controller';
import { CitadelService } from './citadel.service';

describe('CitadelController', () => {
  let appController: CitadelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CitadelController],
      providers: [CitadelService],
    }).compile();

    appController = app.get<CitadelController>(CitadelController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
