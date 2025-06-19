import { Controller, Get, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeQueryDTO } from './dto/employee-query.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  public findAll(@Query() query: EmployeeQueryDTO) {
    return this.employeeService.findAll(query);
  }
}
