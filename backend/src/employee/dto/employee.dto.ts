import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { SatisfactionEnum } from '../../common/enums/satisfaction.enum';

export class EmployeeDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsDateString()
  lastCommunicationDate: string;

  @IsNotEmpty()
  @IsEnum(SatisfactionEnum)
  satisfaction: SatisfactionEnum;

  @IsNotEmpty()
  @IsString()
  name: string;
}
