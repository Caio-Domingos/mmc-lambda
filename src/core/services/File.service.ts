import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async createTxtFile(pathname, name, content) {
    console.log(
      'FileService.createFile() => Criando/Atualizando um novo arquivo',
    );

    // Checar se no caminho existe um arquivo com o mesmo nome
    fs.mkdirSync(`./files/${pathname}`, { recursive: true });

    // Concatenamos o '.txt' no nome do arquivo.
    const filename = `${name}.txt`;
    const fullPath = path.join(`./files/${pathname}`, filename);

    // Como a função writeFile substitui o conteúdo do arquivo caso ele já exista,
    // podemos usá-la diretamente sem a necessidade de verificar se o arquivo já existe.
    await fs.promises.writeFile(fullPath, content);

    console.log(`Arquivo ${filename} criado/atualizado em ${pathname}`);

    return;
  }

  async getFile(pathname, name) {
    console.log('FileService.getFile() => Lendo um arquivo');
    // Checar se no caminho existe um arquivo com o mesmo nome
    fs.mkdirSync(`./files/${pathname}`, { recursive: true });

    const filename = `${name}.txt`;
    const fullPath = path.join(`./files/${pathname}`, filename);

    if (fs.existsSync(fullPath)) {
      // Ao invés de retornar um buffer, agora retornamos uma string.
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      return fileContent;
    } else {
      return '';
    }
  }
}
