import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EventType } from './event.port';
import { EventService } from './event.service';
import { EventDto } from './event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('awareness')
  @HttpCode(HttpStatus.OK)
  async saveAwarenessEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.AWARENESS);
  }

  @Post('acquisition')
  @HttpCode(HttpStatus.OK)
  async saveAcquisitionEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.ACQUISITION);
  }

  @Post('activation')
  @HttpCode(HttpStatus.OK)
  async saveActivationEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.ACTIVATION);
  }

  @Post('retention')
  @HttpCode(HttpStatus.OK)
  async saveRetentionEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.RETENTION);
  }

  @Post('revenue')
  @HttpCode(HttpStatus.OK)
  async saveRevenueEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.REVENUE);
  }

  @Post('referral')
  @HttpCode(HttpStatus.OK)
  async saveReferralEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.REFERRAL);
  }
}
