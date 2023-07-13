import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Beneficiary } from 'src/core/models/Beneficiary';
import { RapidAPIService } from 'src/core/services/RapidAPI.service';

@Injectable()
export class GuruService {
  constructor(private rapidocService: RapidAPIService) {}

  createNewBeneficiary(beneficiary: Beneficiary) {
    return this.rapidocService.createNewBeneficiary(beneficiary);
  }
}
