import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EventType } from './event.port';
import { EventService } from './event.service';
import { EventDto, EventResponseDto } from './event.dto';
@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('awareness')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create an awareness event' })
  @ApiResponse({
    status: 200,
    type: EventResponseDto,
    description: 'The event has been successfully saved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async saveAwarenessEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.AWARENESS);
  }

  @Post('acquisition')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create an acquisition event' })
  @ApiResponse({
    status: 200,
    type: EventResponseDto,
    description: 'The event has been successfully saved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async saveAcquisitionEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.ACQUISITION);
  }

  @Post('activation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create an activation event' })
  @ApiResponse({
    status: 200,
    type: EventResponseDto,
    description: 'The event has been successfully saved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async saveActivationEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.ACTIVATION);
  }

  @Post('retention')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a retention event' })
  @ApiResponse({
    status: 200,
    type: EventResponseDto,
    description: 'The event has been successfully saved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async saveRetentionEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.RETENTION);
  }

  @Post('revenue')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a revenue event' })
  @ApiResponse({
    status: 200,
    type: EventResponseDto,
    description: 'The event has been successfully saved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async saveRevenueEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.REVENUE);
  }

  @Post('referral')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a referral event' })
  @ApiResponse({
    status: 200,
    type: EventResponseDto,
    description: 'The event has been successfully saved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async saveReferralEvent(@Body() eventDto: EventDto) {
    await this.eventService.saveEvent(eventDto, EventType.REFERRAL);
  }
}
