import { Injectable } from '@nestjs/common';
import { CreateBacenDto } from './dto/create-bacen.dto';
import { UpdateBacenDto } from './dto/update-bacen.dto';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { Dado } from 'src/depositos/entities/dada.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { dateFromatter } from 'src/util';

@Injectable()
export class BacenService {

  constructor( private readonly prismaService: PrismaService) {}
 async  create(string: string) {
    const workBook = xlsx.readFile(string);
    const sheetNameList = workBook.SheetNames;

    // Converter a primeira planilha do arquivo para JSON
    const jsonData: any[] = xlsx.utils.sheet_to_json(
      workBook.Sheets[sheetNameList[0]],
    );

    await this.deteleFile(string);

    const spreadsheetFormatData = this.formatarChaves(jsonData) 

    const spreadSheetFinal = spreadsheetFormatData.map((deposito) =>{
      return {
      
          data_movimento: this.formatValueinDate(deposito.data_movimento),
          devedor_sfn: deposito.devedor_sfn,
          prejuizo_sfn: deposito.prejuizo_sfn,
          vencido_sfn: deposito.vencido_sfn,
          modalidade_bacen: deposito.modalidade_bacen,
          submodalidade_bacen: deposito.submodalidade_bacen,
          cpf_cnpj: deposito.cpf_cnpj,
          origem_data: "MANUAL"
      }
    }) 

    console.log("Enviando para o banco de dados: ",dateFromatter.format(new Date()))
    console.log(spreadSheetFinal[0])
    

    const insertPrisma = await this.prismaService.bacen.createMany({
      data: spreadSheetFinal
    })

    console.log("Fim da inserção mongoDB: ",dateFromatter.format(new Date()))

    return {message: "dados de bacen inseridos com sucesso"};

  }

  

  formatarChaves(dados: Dado[]): Dado[] {
    return dados.map((obj: Dado) => {
      const novoObj: Dado = {};
      for (let chave in obj) {
        let novaChave = chave
          .replace(/ /g, '_')
          .replace(/\//g, '_') // Substitui barras por underscores
          .replace(/º/g, '') // Remove o caractere º
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ç/g, 'C');
        novoObj[novaChave] = obj[chave];
      }
      return novoObj;
    });
  }

  
  convertToTimezone(date: Date): Date {
    date.setDate(date.getDate() - 1);
    date.setHours(8, 0, 0, 0);
    return date;
  }

  formatValueinDate(valor: number) {
    if (typeof valor === 'number') {
      const data = new Date(1900, 0, Number(valor));
      if (!isNaN(data.getTime())) {
        return this.convertToTimezone(new Date(data.getTime()));
      }
    } else if (typeof valor === 'string') {
      const data = this.convertToTimezone(new Date(valor));
      console.log(data);
      return data;
    }
  }

  async deteleFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('--------------------------------');
        console.log(`${filePath} deletado com sucesso.`);
        console.log('--------------------------------');
      }
    });
  }

  findAll() {
    return `This action returns all bacen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bacen`;
  }

  update(id: number, updateBacenDto: UpdateBacenDto) {
    return `This action updates a #${id} bacen`;
  }

  remove(id: number) {
    return `This action removes a #${id} bacen`;
  }
}
