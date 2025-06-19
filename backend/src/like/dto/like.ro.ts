import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { LikeDTO } from './like.dto';

export class LikeRO {
  @IsNotEmpty()
  @IsArray()
  items: LikeDTO[];

  @IsInt()
  @IsNotEmpty()
  total: number;
}
