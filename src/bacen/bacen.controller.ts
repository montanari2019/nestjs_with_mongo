import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { BacenService } from './bacen.service';
import { CreateBacenDto } from './dto/create-bacen.dto';
import { UpdateBacenDto } from './dto/update-bacen.dto';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { dateFromatter } from 'src/util';

@Controller('bacen')
export class BacenController {
  constructor(private readonly bacenService: BacenService) {}

  @Post('create')
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      limits: {
        fileSize: 1024 * 1024 * 150,
      },
    }),
  )
  @ApiOkResponse({
    description:
      'Rota para inserção de depósitos via upload de arquivo excel ou csv',
    isArray: true,
  })
  create(@UploadedFile() file: Express.Multer.File) {
    if (file === undefined) throw new NotFoundException('No file');
    console.log("Upload file controle: ",dateFromatter.format(new Date()))
    const SheetNames = file.originalname.split('.');
    const fileType = SheetNames[SheetNames.length - 1];

    // console.log(fileType);

    if (fileType !== 'xlsx') throw new NotFoundException('type file not supported')
    
      return this.bacenService.create(file.path)
  }

  @Get()
  findAll() {
    return this.bacenService.findAll();
  }

}
