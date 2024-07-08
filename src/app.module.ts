import { Module } from '@nestjs/common';
import { DepositosModule } from './depositos/depositos.module';


@Module({
  imports: [DepositosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
