import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as path from 'path';
import { Dado } from './entities/dada.entity';
import { DepositoPrimitiveEntity } from './entities/depositos.primitive.entity';
import {  DepositoEntity } from './entities/deposito.entity';

@Injectable()
export class DepositosService {
  constructor( private readonly prismaService: PrismaService) {}
  async create(filePath: string) {
    const workBook = xlsx.readFile(filePath);
    const sheetNameList = workBook.SheetNames;

    // Converter a primeira planilha do arquivo para JSON
    const jsonData: any[] = xlsx.utils.sheet_to_json(
      workBook.Sheets[sheetNameList[0]],
    );

    await this.deteleFile(filePath);

    const spreadsheetFormatData = this.formatarChaves(jsonData) as DepositoPrimitiveEntity[]

    const spreadSheetFinal = spreadsheetFormatData.map((deposito) =>{
      return {
      
          data_movimento: this.formatValueinDate(deposito.data_movimento),
          modalidade: deposito.modalidade,
          numero_pa: deposito.numero_pa,
          valor_deposito: deposito.valor_saldo_medio_dias_uteis
      }
    }) 

    

    const insertPrisma = await this.prismaService.depositos.createMany({
      data: spreadSheetFinal
    })

    return {message: "item inserido com sucesso"};

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



  async findAll(){
    return await this.prismaService.depositos.findMany();
  }
}
