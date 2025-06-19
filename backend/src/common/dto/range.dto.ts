import {IsEnum, IsOptional} from 'class-validator';
import { RangeEnum } from '../enums/range.enum';

export class RangeDTO {
    @IsOptional()
    @IsEnum(RangeEnum)
    range?: RangeEnum;
}