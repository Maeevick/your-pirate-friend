import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('health')
  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check API health' })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    schema: {
      type: 'string',
      example: 'ok',
    },
  })
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
