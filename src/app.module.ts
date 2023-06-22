import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuruModule } from './routes/guru/guru.module';
import { RapidAPIService } from './core/services/RapidAPI.service';

@Module({
  imports: [GuruModule],
  controllers: [AppController],
  providers: [AppService, RapidAPIService],
})
export class AppModule {}
