import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Beneficiary } from 'src/core/models/Beneficiary';
import { RapidAPIService } from 'src/core/services/RapidAPI.service';

@Injectable()
export class GuruService {
  constructor(private rapidocService: RapidAPIService) {}

  getBeneficiary(beneficiary: Beneficiary) {
    return this.rapidocService.getBeneficiary(beneficiary);
  }
  createNewBeneficiary(beneficiary: Beneficiary) {
    return this.rapidocService.createNewBeneficiary(beneficiary);
  }

  async activeBeneficiary(beneficiary: string) {
    return this.rapidocService.activeBeneficiary(beneficiary);
  }
  async deactiveBeneficiary(beneficiary: string) {
    return this.rapidocService.deactiveBeneficiary(beneficiary);
  }
}
