import { SummaryDTO } from './summary.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EmployeeDTO } from './employee.dto';

export class EmployeeRawDTO {
  @IsNotEmpty()
  @Type(() => SummaryDTO)
  @ValidateNested()
  summary: SummaryDTO;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  employeesData: EmployeeDTO[];
}
