import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { EmployeeRawDTO } from './dto/employee-raw.dto';
import { DATASET } from '../common/data/data.provider';
import { CommunicationDTO } from '../communication/dto/communication.dto';

@Injectable()
export class EmployeeRepository {
  constructor(
    @Inject(DATASET)
    private readonly dataset: { employeesSatisfaction: EmployeeRawDTO },
  ) {}

  public getEmployees(): EmployeeRawDTO {
    return this.dataset.employeesSatisfaction;
  }
}
