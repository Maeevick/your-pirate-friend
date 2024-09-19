import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { drizzleProvider } from './drizzle/drizzle.provider';

@Module({
  imports: [ConfigModule.forRoot(), DrizzleModule],
  controllers: [AppController],
  providers: [AppService, drizzleProvider],
})
export class AppModule {}
