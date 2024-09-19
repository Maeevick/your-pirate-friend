import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { drizzleProvider } from './drizzle/drizzle.provider';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService, drizzleProvider],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "ok"', async () => {
      expect(appController.getHealthCheck()).toBe('ok');
    });
  });
  describe('hello', () => {
    it(`should return '{hello:"Pirate!"}'`, async () => {
      expect(await appController.getHello()).toStrictEqual({
        hello: 'Pirate!',
      });
    });
  });
});
