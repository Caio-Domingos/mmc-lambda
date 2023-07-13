import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Beneficiary } from '../models/Beneficiary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RapidAPIService {
  constructor(private configService: ConfigService) {}

  async createNewBeneficiary(beneficiary: Beneficiary) {
    const token = this.configService.get<string>('RAPIDOC_TOKEN');
    const clientID = this.configService.get<string>('RAPIDOC_CLIENTID');

    try {
      const req = await axios({
        method: 'post',
        url: this.configService.get<string>('RAPIDOC_URL') + '/beneficiaries',
        headers: {
          'Content-Type': 'application/vnd.rapidoc.tema-v2+json',
          Authorization: `Bearer ${token}`,
          clientId: clientID,
        },
        data: [beneficiary],
      });

      return req.data;
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error('Error', error.message);
      }
      console.error(error.config);
      throw error;
    }
  }
}
