import { PartialType } from '@nestjs/swagger';
import { CreateBacenDto } from './create-bacen.dto';

export class UpdateBacenDto extends PartialType(CreateBacenDto) {}
