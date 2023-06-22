import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Beneficiary } from '../models/Beneficiary';

@Injectable()
export class RapidAPIService {
  //   constructor(private configService: ConfigService) {}

  async createNewBeneficiary(beneficiary: Beneficiary) {
    const token =
      'eyJhbGciOiJSUzUxMiJ9.eyJjbGllbnQiOiJNTUMgRU1QUkVFTkRJTUVOVE9TIn0.G8hVgWLR4uiQCDqcHomilbICSx3GAthx4eOA5zcA0REnrHs2JMOHibpbZ9ZH5CaDlhjRsfxr8H75yvDbOywt78pmc73PjCe9K8JA-V9FImmoOx9VVy6eBPHNNl8hELr1_-np_BZk7wA1K-3HfguF4SV9j7tZDi13ZqbK3Bbr7UGrSwR6Q61CqfyXGdMEcCmBFsLKnSh9guFL894uXKxsGhHvn3qWdPLbKkOi1q3ACxPB_7Cy2j6cNBYpgfgEqt7DU-rBVyrCRs-Qs8lZqC9WAcXpfi-cURkw8WU_HPppB5Jts4R9zoV7MmFINMbUP3auaTH53jlVHSfSFn0xUhLM2G1FKmDw8-A1ve09zFWKmNt7vUahU-vireq56lo4Pj6PsAIZXFGw5ZMY7Xb8CvQ0I5wIKqbsL4C-Yhv4RA8Rov0ixf82R9ZOiRaWI5iNh9QNw22AKPVQxQc6Co6mTRum38jkmtD9TojgWkY1Ep9vCBk-XXtc9bta1AXs-Nvnj0YJxHBLH0jznCNoqHN-9CYUjnckoBAa1KSmBQbf1HDQsZH_5Zj7DVXAzBY64D0VqVxL-W7vF_vUwd0E_USBsPytrgXxG7eEIVZls7wrlOD5MlU-U217ca5iv54HB7oH-NWGYG-cgCNOG1KuQmvMrysihWvRlrCnD0yZ1yvHYBb08qw';
    const clientID = 'c99836c5-e8e0-4895-b3e0-33a88f68f43c';

    try {
      const req = await axios({
        method: 'post',
        url: 'https://sandbox.rapidoc.tech/tema/api/beneficiaries',
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
