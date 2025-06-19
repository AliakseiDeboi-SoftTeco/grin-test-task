import { IsOptional, IsEnum } from 'class-validator';
import { QueryDTO } from '../../common/dto/query.dto';
import { SatisfactionEnum } from '../../common/enums/satisfaction.enum';

export class EmployeeQueryDTO extends QueryDTO {
  @IsOptional()
  @IsEnum(SatisfactionEnum)
  satisfaction?: SatisfactionEnum;
}
