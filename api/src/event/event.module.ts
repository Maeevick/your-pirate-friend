import { Module } from '@nestjs/common';

import { ProjectModule } from '../project/project.module';

import { EventController } from './event.controller';

import { EventService } from './event.service';
import { EventRepository } from './event.repository';

import { drizzleProvider } from '../drizzle/drizzle.provider';
import { UserRepository } from '../user/user.repository';
import { ProjectRepository } from '../project/project.repository';

@Module({
  imports: [ProjectModule],
  controllers: [EventController],
  providers: [
    drizzleProvider,
    EventService,
    UserRepository,
    ProjectRepository,
    EventRepository,
  ],
})
export class EventModule {}
