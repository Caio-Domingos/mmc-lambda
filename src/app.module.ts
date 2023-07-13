import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuruModule } from './routes/guru/guru.module';
import { RapidAPIService } from './core/services/RapidAPI.service';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './core/services/Email.service';

@Module({
  imports: [GuruModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, RapidAPIService, EmailService],
})
export class AppModule {}
