import { Body, Controller, Post } from '@nestjs/common';
import { GuruService } from './guru.service';
import { GuruSubscriptionPaid } from './interface/Guru-Item';
import { Beneficiary } from 'src/core/models/Beneficiary';

@Controller('guru')
export class GuruController {
  constructor(private readonly guruService: GuruService) {}

  @Post('new-client')
  async newClient(@Body() body: GuruSubscriptionPaid) {
    console.log(
      'New Client Route => Atual Time DD/MM/YYYY HH:MM:SS',
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    );
    // Checar se a compra é valida
    // Checar se o item é um dos validos para gerar um novo cliente
    /*
        body.subscriber.email,
        body.subscriber.name,
        { phone: body.subscriber.phone_number, cpf: body.subscriber.doc }
    */
    const itemsList = [
      '5f9b3b4b9b7c7a0011b8b3a5',
      '5f9b3b4b9b7c7a0011b8b3a6',
      '5f9b3b4b9b7c7a0011b8b3a7',
      'SBCLUB001',
    ];

    if (itemsList.includes(`${body.product.marketplace_id}`)) {
      // Se sim
      // Criar um novo objeto beneficiario

      /*
      Beneficiario: 
        "name": "João Silva",
        "cpf": "88228279027",
        "birthday": "01/01/2000",
        "phone": "11999999999",
        "email": "teste@gmail.com",
        "zipCode": "38065280",
        "address": "Rua de Teste, 01",
        "city": "Belo Horizonte",
        "state": "MG"
      */

      const newBeneficiary: Beneficiary = {
        name: body.subscriber.name,
        cpf: body.subscriber.doc,
        birthday: '2000-01-01',
        phone: body.subscriber.phone_number,
        email: body.subscriber.email,
        zipCode: body.subscriber.address_zip_code,
        address: body.subscriber.address,
        city: body.subscriber.address_city,
        state: body.subscriber.address_state,
      };
      console.log('Novo Beneficiario => ', newBeneficiary);

      // Enviar para a API do aplicativo
      const resBenefeciary = await this.guruService.createNewBeneficiary(
        newBeneficiary,
      );
      console.log(resBenefeciary);

      if (resBenefeciary.success) {
        // Enviar email de boas vindas
      } else {
        // Enviar email de erro para o time
        console.log(
          'Erro ao criar novo beneficiario no CPF =>',
          newBeneficiary.cpf,
        );
      }
    } else {
      // Não realizar nenhuma operação
      console.log(
        'Item não é um dos validos',
        `${body.product.marketplace_id}`,
      );
    }

    // Finalizar operação

    return {
      ok: true,
      message: 'success',
    };
  }
}
