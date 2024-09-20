import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { drizzleProvider } from './drizzle/drizzle.provider';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user/user.repository';

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
  ],
})
export class AppModule {}
