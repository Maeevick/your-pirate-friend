import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { drizzleProvider } from './drizzle/drizzle.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController],
  providers: [AppService, drizzleProvider],
})
export class AppModule {}
