import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Beneficiary } from '../models/Beneficiary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RapidAPIService {
  constructor(private configService: ConfigService) {}

  // Private methods
  private getConfig() {
    const token = this.configService.get<string>('RAPIDOC_TOKEN');
    const clientID = this.configService.get<string>('RAPIDOC_CLIENTID');
    const rapidocUrl = this.configService.get<string>('RAPIDOC_URL');
    return { token, clientID, rapidocUrl };
  }
  private makeRequest(
    method: 'post' | 'get' | 'put' | 'delete',
    url: string,
    rapidocUrl: string,
    token: string,
    clientID: string,
    data?: any,
  ) {
    const request = {
      method,
      url: rapidocUrl + url,
      headers: {
        'Content-Type': 'application/vnd.rapidoc.tema-v2+json',
        Authorization: `Bearer ${token}`,
        clientId: clientID,
      },
    };

    if (data) {
      request['data'] = data;
    }
    return axios(request);
  }
  private logErrors(error: any) {
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
  }

  // Public methods
  async getBeneficiary(beneficiary: Beneficiary) {
    const { token, clientID, rapidocUrl } = this.getConfig();

    try {
      const req: any = await this.makeRequest(
        'get',
        '/beneficiaries/' + beneficiary.cpf,
        rapidocUrl,
        token,
        clientID,
      );

      return req.data;
    } catch (error) {
      this.logErrors(error);
      throw error;
    }
  }
  async createNewBeneficiary(beneficiary: Beneficiary) {
    const { token, clientID, rapidocUrl } = this.getConfig();

    try {
      const req: any = await this.makeRequest(
        'post',
        '/beneficiaries',
        rapidocUrl,
        token,
        clientID,
        [beneficiary],
      );

      return req.data;
    } catch (error) {
      this.logErrors(error);
      throw error;
    }
  }

  async activeBeneficiary(beneficiary: string) {
    const { token, clientID, rapidocUrl } = this.getConfig();

    try {
      const req: any = await this.makeRequest(
        'put',
        `/beneficiaries/${beneficiary}/reactivate`,
        rapidocUrl,
        token,
        clientID,
      );

      return req.data;
    } catch (error) {
      this.logErrors(error);
      throw error;
    }
  }
  async deactiveBeneficiary(beneficiary: string) {
    const { token, clientID, rapidocUrl } = this.getConfig();

    try {
      const req: any = await this.makeRequest(
        'delete',
        `/beneficiaries/${beneficiary}`,
        rapidocUrl,
        token,
        clientID,
      );

      return req.data;
    } catch (error) {
      this.logErrors(error);
      throw error;
    }
  }
}
