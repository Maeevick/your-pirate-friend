import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ProjectModule } from '../project/project.module';
import { EventModule } from './event.module';

import { EventController } from './event.controller';
import { EventService } from './event.service';

import { drizzleProvider } from '../drizzle/drizzle.provider';
import { UserRepository } from '../user/user.repository';
import { ProjectRepository } from '../project/project.repository';
import { EventRepository } from './event.repository';

describe('EventController', () => {
  let eventController: EventController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService],
          global: true,
        }),
        EventModule,
        ProjectModule,
      ],
      controllers: [EventController],
      providers: [
        EventService,
        drizzleProvider,
        UserRepository,
        ProjectRepository,
        EventRepository,
      ],
    }).compile();

    eventController = app.get<EventController>(EventController);
  });

  afterEach(async () => {
    // @TODO: remove fake events
  });

  describe('event received', () => {
    describe(`with valid data`, () => {
      it('returns success message', async () => {
        const fakeEventData = {
          key: 'some-super-api-public-key',
          domain: 'maeevick',
          name: 'some-custom-name',
          timestamp: 0,
          source: 'some-hash',
        };

        const awarenessResult =
          await eventController.saveAwarenessEvent(fakeEventData);
        expect(awarenessResult).toStrictEqual({
          message: 'Event saved successfully',
        });

        const acquisitionResult =
          await eventController.saveAcquisitionEvent(fakeEventData);
        expect(acquisitionResult).toStrictEqual({
          message: 'Event saved successfully',
        });

        const activationResult =
          await eventController.saveActivationEvent(fakeEventData);
        expect(activationResult).toStrictEqual({
          message: 'Event saved successfully',
        });

        const retentionResult =
          await eventController.saveRetentionEvent(fakeEventData);
        expect(retentionResult).toStrictEqual({
          message: 'Event saved successfully',
        });

        const revenueResult =
          await eventController.saveRevenueEvent(fakeEventData);
        expect(revenueResult).toStrictEqual({
          message: 'Event saved successfully',
        });

        const referralResult =
          await eventController.saveReferralEvent(fakeEventData);
        expect(referralResult).toStrictEqual({
          message: 'Event saved successfully',
        });
      });
    });

    describe.skip(`with invalid API public key`, () => {
      // @TODO: implement me
    });

    describe.skip(`with invalid domain`, () => {
      // @TODO: implement me
    });
  });
});
