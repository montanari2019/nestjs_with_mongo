import { Module } from '@nestjs/common';
import { BacenService } from './bacen.service';
import { BacenController } from './bacen.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BacenController],
  providers: [BacenService],
  imports: [PrismaModule]
})
export class BacenModule {}
