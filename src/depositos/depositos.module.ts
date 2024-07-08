import { Module } from '@nestjs/common';
import { DepositosService } from './depositos.service';
import { DepositosController } from './depositos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DepositosController],
  providers: [DepositosService],
  imports: [PrismaModule]
})
export class DepositosModule {}
