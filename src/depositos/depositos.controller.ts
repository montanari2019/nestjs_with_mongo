import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DepositosService } from './depositos.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';


@Controller('depositos')
export class DepositosController {
  constructor(private readonly depositosService: DepositosService) {}

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
        fileSize: 1024 * 1024 * 20,
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
    const SheetNames = file.originalname.split('.');
    const fileType = SheetNames[SheetNames.length - 1];

    // console.log(fileType);

    if (fileType !== 'xlsx') throw new NotFoundException('type file not supported')
    
      return this.depositosService.create(file.path)
  }

  @Get("find")
  findAll() {
    return this.depositosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.depositosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepositoDto: UpdateDepositoDto) {
  //   return this.depositosService.update(+id, updateDepositoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.depositosService.remove(+id);
  // }
}
