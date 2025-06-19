import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeSatisfactionController } from './employee-satisfaction.controller';
import { EmployeeRepository } from './employee.repository';

@Module({
  controllers: [EmployeeController, EmployeeSatisfactionController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
