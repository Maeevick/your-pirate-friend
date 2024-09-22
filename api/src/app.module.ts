import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { EventModule } from './event/event.module';

import { drizzleProvider } from './drizzle/drizzle.provider';
import { UserRepository } from './user/user.repository';
import { ProjectRepository } from './project/project.repository';
import { EventRepository } from './event/event.repository';
import { ProjectModule } from './project/project.module';

@Module({
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
    ProjectModule,
    EventModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    drizzleProvider,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
    {
      provide: 'PROJECT_REPOSITORY',
      useClass: ProjectRepository,
    },
    {
      provide: 'EVENT_REPOSITORY',
      useClass: EventRepository,
    },
  ],
})
export class AppModule {}
