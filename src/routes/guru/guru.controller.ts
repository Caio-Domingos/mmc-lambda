import { Body, Controller, Post } from '@nestjs/common';
import { GuruService } from './guru.service';
import { GuruSubscriptionPaid } from './interface/Guru-Item';
import { Beneficiary } from 'src/core/models/Beneficiary';
import { EmailService } from 'src/core/services/Email.service';
import { FileService } from 'src/core/services/File.service';
import { create } from 'domain';

@Controller('guru')
export class GuruController {
  constructor(
    private readonly guruService: GuruService,
    private emailService: EmailService,
    private fileService: FileService,
  ) {}

  @Post('new-client')
  async newClient(@Body() body: GuruSubscriptionPaid) {
    console.log(
      'New Client Route => Atual Time DD/MM/YYYY HH:MM:SS',
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    );
    console.log('Compra com ID => ', body.id);
    // Checar se a compra é valida
    // Checar se o item é um dos validos para gerar um novo cliente
    /*
        body.subscriber.email,
        body.subscriber.name,
        { phone: body.subscriber.phone_number, cpf: body.subscriber.doc }
    */
    const itemsList = ['1687547865'];
    // Checar se a compra já foi processada no arquivo txt
    console.log('Checando se a compra já foi processada');
    const pathname = 'guru';
    const filename = `beneficiaries`;

    const fileContent = await this.fileService.getFile(pathname, filename);
    console.log('Conteudo do arquivo => ', fileContent);

    if (fileContent.includes(`${body.id}`)) {
      // Se sim
      console.log('Compra já processada');
      return {
        ok: true,
        message: 'success',
      };
    }
    console.log('Compra ainda não processada');
    // Salvar os dados do beneficiario em um arquivo txt
    console.log('Salvando compra em um arquivo txt');

    const content = `${fileContent}${body.id}\n`;
    await this.fileService.createTxtFile(pathname, filename, content);

    console.log('Checando se o item é um dos validos');
    if (itemsList.includes(`${body.product.marketplace_id}`)) {
      console.log('Item é um dos validos');
      console.log('Iniciando processo de criação do beneficiario...');
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
      const resBenefeciary = await this.checkBeneficiary(newBeneficiary);

      if (resBenefeciary.success) {
        console.log('Novo beneficiario criado com sucesso');
        // Enviar email de boas vindas
        await this.emailService.sendWelcomeEmail(
          body.subscriber.email,
          body.subscriber.name,
          body.subscriber.phone_number,
        );
      } else {
        console.log('Erro ao criar novo beneficiario');
        // Enviar email de erro para o time
        console.log('Enviando email para o time de suporte');
        const emailSupport = this.emailService.sendSupportEmail(
          body.subscriber.email,
          body.subscriber.name,
          body.subscriber.phone_number,
        );

        // Enviar email de erro o cliente pedindo para esperar e se não receber entrar em contato via email
        console.log('Enviando email para o cliente');
        const emailClient = this.emailService.sendErrorClientEmail(
          body.subscriber.email,
          body.subscriber.name,
        );

        await Promise.all([emailSupport, emailClient]);

        console.log(
          'Erro ao criar novo beneficiario no CPF =>',
          newBeneficiary.cpf,
        );
        // contato@mamaecompleta.com.br
      }
    } else {
      // Não realizar nenhuma operação
      console.log(
        'Item não é um dos validos',
        `${body.product.marketplace_id}`,
      );
    }

    // Finalizar operação
    console.log('Finalizando operação');
    return {
      ok: true,
      message: 'success',
    };
  }
  private async checkBeneficiary(newBeneficiary: Beneficiary) {
    // Checar se existe um beneficiario com o mesmo CPF/Email
    console.log('Checando se existe um beneficiario com o mesmo CPF/Email');

    try {
      const resBenefeciary = await this.guruService.getBeneficiary(
        newBeneficiary,
      );

      const ret: any = { success: false, error: false };
      if (resBenefeciary.beneficiary && resBenefeciary.beneficiary.uuid) {
        console.log('Beneficiario já existe');
        const updateRes = await this.guruService.activeBeneficiary(
          resBenefeciary.beneficiary.uuid,
        );

        if (updateRes.success) {
          console.log('Beneficiario ativado com sucesso');
          ret.success = true;
        } else {
          console.log('Erro ao ativar beneficiario', updateRes);
          ret.error = true;
        }
      } else {
        console.log('Beneficiario não existe pelo CPF, criando um novo');
        const createRes = await this.guruService.createNewBeneficiary(
          newBeneficiary,
        );
        if (createRes.success) {
          console.log('Beneficiario criado com sucesso');
          ret.success = true;
        } else {
          console.log('Erro ao criar beneficiario', createRes);
          // const updateRes = await this.guruService.activeBeneficiary(
          //   resBenefeciary.beneficiary.uuid,
          // );

          // if (updateRes.success) {
          //   ret.success = true;
          // } else {
          ret.error = true;
          // }
        }
      }

      return ret;
    } catch (error) {
      return { error: true };
    }
  }

  @Post('inactive-client')
  async inactiveClient(@Body() body: GuruSubscriptionPaid) {
    // To Do

    return { ok: true };
  }
}
