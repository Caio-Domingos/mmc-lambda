import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { welcomeRapidocTemplate } from '../templates/ts/welcome-rapidoc';
import { errorSendSupportRapidocTemplate } from '../templates/ts/error-send-support-rapidoc';
import { errorSendClientRapidocTemplate } from '../templates/ts/error-send-client-rapidoc';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendWelcomeEmail(email: string, name: string, phone: string) {
    const last4DigitsPhone = phone.slice(-4);
    const templateWelcome = welcomeRapidocTemplate
      .replace('{{NOME}}', name.toString())
      .replace('{{EMAIL}}', email.toString())
      .replace('{{EMAIL}}', email.toString())
      .replace('{{SENHA}}', last4DigitsPhone.toString());

    const url =
      this.configService.get<string>('URL_LAMBDA') + '/sendSingleEmail';
    console.log('url ses', url);
    try {
      const { data } = await axios.post(url, {
        destination: email,
        template: templateWelcome,
        subject: 'Bem vindo à Mamãe Completa!',
      });

      return data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        throw new HttpException(error.response.data, 500);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new HttpException('Sem resposta do SES', 500);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw new HttpException(error.message, 500);
      }
      console.log(error.config);
      throw new HttpException('Unknown Error', 500);
    }
  }

  async sendSupportEmail(email: string, name: string, phone: string) {
    const template = errorSendSupportRapidocTemplate
      .replace('{{NOME}}', name.toString())
      .replace('{{NOME}}', name.toString())
      .replace('{{EMAIL}}', email.toString())
      .replace('{{EMAIL}}', email.toString())
      .replace('{{TELEFONE}}', phone.toString())
      .replace('{{TELEFONE}}', phone.toString());

    const url =
      this.configService.get<string>('URL_LAMBDA') + '/sendSingleEmail';
    console.log('url ses', url);
    try {
      const { data } = await axios.post(url, {
        destination: 'contato@mamaecompleta.com.br',
        // destination: 'caio.domingos@thinkless.com.br',
        template: template,
        subject: 'Erro ao criar um acesso para o aluno',
      });

      return data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        throw new HttpException(error.response.data, 500);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new HttpException('Sem resposta do SES', 500);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw new HttpException(error.message, 500);
      }
      console.log(error.config);
      throw new HttpException('Unknown Error', 500);
    }
  }

  async sendErrorClientEmail(email: string, name: string) {
    const template = errorSendClientRapidocTemplate.replace(
      '{{NOME}}',
      name.toString(),
    );

    const url =
      this.configService.get<string>('URL_LAMBDA') + '/sendSingleEmail';
    console.log('url ses', url);
    try {
      const { data } = await axios.post(url, {
        destination: email,
        template: template,
        subject: 'Erro ao criar um acesso para o aluno',
      });

      return data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        throw new HttpException(error.response.data, 500);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new HttpException('Sem resposta do SES', 500);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw new HttpException(error.message, 500);
      }
      console.log(error.config);
      throw new HttpException('Unknown Error', 500);
    }
  }
}
