import { Module } from '@nestjs/common';
import { GuruService } from './guru.service';
import { GuruController } from './guru.controller';
import { RapidAPIService } from 'src/core/services/RapidAPI.service';

@Module({
  controllers: [GuruController],
  providers: [GuruService, RapidAPIService],
})
export class GuruModule {}
