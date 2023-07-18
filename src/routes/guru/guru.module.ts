import { Module } from '@nestjs/common';
import { GuruService } from './guru.service';
import { GuruController } from './guru.controller';
import { RapidAPIService } from 'src/core/services/RapidAPI.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from 'src/core/services/Email.service';
import { FileService } from 'src/core/services/File.service';

@Module({
  controllers: [GuruController],
  providers: [GuruService, RapidAPIService, EmailService, FileService],
  imports: [ConfigModule],
})
export class GuruModule {}
