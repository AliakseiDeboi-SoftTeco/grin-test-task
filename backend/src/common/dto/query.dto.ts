import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { RangeEnum } from '../enums/range.enum';
import { Type } from 'class-transformer';

export class QueryDTO {
  @IsOptional()
  @IsEnum(RangeEnum)
  range?: RangeEnum;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  limit = 10;
}
