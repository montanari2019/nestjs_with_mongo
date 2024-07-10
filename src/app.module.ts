import { Module } from '@nestjs/common';
import { DepositosModule } from './depositos/depositos.module';
import { BacenModule } from './bacen/bacen.module';


@Module({
  imports: [DepositosModule, BacenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
