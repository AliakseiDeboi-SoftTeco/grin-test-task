import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { LiveCallDTO } from './live-call.dto';
import { Transform } from 'class-transformer';

export class LiveCallRO {
  @IsNotEmpty()
  @IsArray()
  items: LiveCallDTO[];

  @IsNotEmpty()
  @IsNumber()
  timeSaved: number;

  @IsInt()
  @IsNotEmpty()
  total: number;
}
