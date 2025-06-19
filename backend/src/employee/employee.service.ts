import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import {getDateInterval} from "../common/utils/date-range";
import {EmployeeRepository} from "./employee.repository";
import {EmployeeQueryDTO} from "./dto/employee-query.dto";
import {EmployeeRO} from "./dto/employee.ro";
import {SatisfactionQueryDTO} from "../patient/dto/satisfaction-query.dto";
import {SummaryRO} from "../patient/dto/summary.ro";

@Injectable()
export class EmployeeService {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    public findAll(dto: EmployeeQueryDTO): EmployeeRO {
        const base = this.employeeRepository.getEmployees();

        const { start, end } = getDateInterval(dto.range);
        const { employeesData } = base;
        let filtered = employeesData.filter(lc =>
            isWithinInterval(parseISO(lc.lastCommunicationDate), { start, end }),
        );

        if (dto.satisfaction) {
            filtered = employeesData.filter(item => item.satisfaction === dto.satisfaction);
        }

        const total = filtered.length;

        const { page, limit } = dto;
        const offset = (page - 1) * limit;
        const items = filtered.slice(offset, offset + limit);

        return { total, items };
    }

    public getSatisfaction(dto: SatisfactionQueryDTO): SummaryRO {
        const base = this.employeeRepository.getEmployees();
        const { start, end } = getDateInterval(dto.range);
        const { employeesData } = base;
        const filtered = employeesData
            .filter(p =>
                isWithinInterval(parseISO(p.lastCommunicationDate), { start, end }),
            );

        return {
            summary: {
                negative: filtered.filter(p => p.satisfaction === 'negative').length,
                neutral: filtered.filter(p => p.satisfaction === 'neutral').length,
                positive: filtered.filter(p => p.satisfaction === 'positive').length,
            }
        };
    }
}
