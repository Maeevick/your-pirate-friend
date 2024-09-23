import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({ description: "Your project's API Public Key" })
  @IsString()
  key: string;

  @ApiProperty({
    description:
      "Your project's domain from where the event is fired 'example: maeevick.com'",
  })
  @IsString()
  domain: string;

  @ApiProperty({ description: 'The name you choose for this event' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The timestamp when the event was fired' })
  @IsNumber()
  timestamp: number;

  @ApiProperty({
    description: 'The unique identifier for the source of the event',
  })
  @IsString()
  source: string;
}

export class EventResponseDto {
  @ApiProperty({ example: 'Event saved successfully' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;
}
