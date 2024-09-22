import { IsString, IsNumber } from 'class-validator';

export class EventDto {
  @IsString()
  key: string;

  @IsString()
  domain: string;

  @IsString()
  name: string;

  @IsNumber()
  timestamp: number;

  @IsString()
  source: string;
}
