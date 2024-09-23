import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Your Pirate Friend API')
      .setDescription('The API description for Your Pirate Friend')
      .setVersion('1.0')
      .addTag('health', 'Health Check endpoints')
      .addTag('auth', 'Authentication endpoints')
      .addTag('events', 'AARRR Events endpoints')
      .build(),
  );
  SwaggerModule.setup('openapi', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      docExpansion: 'list',
      tags: ['health', 'auth', 'events'],
    },
  });

  await app.listen(port, '0.0.0.0', () => {
    console.info(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
