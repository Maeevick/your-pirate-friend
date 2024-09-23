import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ProjectRepository } from '../project/project.repository';
import { EventRepository } from './event.repository';
import { EventDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    private projectRepository: ProjectRepository,
    private eventRepository: EventRepository,
  ) {}

  private async validateEvent(eventDto: any): Promise<string> {
    const project = await this.projectRepository.findByPublicKey(eventDto.key);
    if (!project) {
      throw new UnauthorizedException('Invalid API key');
    }

    if (project.name !== eventDto.domain) {
      throw new BadRequestException(
        'API key does not match the provided domain',
      );
    }

    return project.id;
  }

  async saveEvent(
    eventDto: EventDto,
    eventType: string,
  ): Promise<{ message: string }> {
    const projectId = await this.validateEvent(eventDto);

    await this.eventRepository.save({
      type: eventType,
      timestamp: new Date(eventDto.timestamp),
      source: eventDto.source,
      name: eventDto.name,
      projectId,
    });

    return { message: 'Event saved successfully' };
  }
}
