import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {EmployeeRawDTO} from "./dto/employee-raw.dto";

@Injectable()
export class EmployeeRepository {
    private readonly employees: EmployeeRawDTO;

    constructor() {
        const raw = readFileSync(
            join(__dirname, '..', '..', 'data', 'dataset.json'),
            'utf8',
        );
        this.employees = JSON.parse(raw).employeesSatisfaction;
    }

    public getEmployees(): EmployeeRawDTO {
        return this.employees;
    }
}