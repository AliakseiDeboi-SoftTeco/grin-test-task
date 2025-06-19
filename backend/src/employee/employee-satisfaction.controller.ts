import { Controller, Get, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { SatisfactionQueryDTO } from '../patient/dto/satisfaction-query.dto';

@Controller('employees/satisfaction')
export class EmployeeSatisfactionController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  public getSatisfaction(@Query() dto: SatisfactionQueryDTO) {
    return this.employeeService.getSatisfaction(dto);
  }
}
