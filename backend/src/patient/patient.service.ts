import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import { getDateInterval } from '../common/utils/date-range';
import { PatientRepository } from './patient.repository';
import { PatientQueryDTO } from './dto/patient-query.dto';
import { PatientRO } from './dto/patient.ro';
import { SatisfactionQueryDTO } from './dto/satisfaction-query.dto';
import { SummaryRO } from './dto/summary.ro';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  public findAll(dto: PatientQueryDTO): PatientRO {
    const base = this.patientRepository.getPatients();

    const { start, end } = getDateInterval(dto.range);
    const { patientsData } = base;

    let filtered = patientsData.filter((lc) =>
      isWithinInterval(parseISO(lc.lastCommunicationDate), { start, end }),
    );

    if (dto.satisfaction) {
      filtered = patientsData.filter(
        (item) => item.satisfaction === dto.satisfaction,
      );
    }

    return paginate(filtered, dto.page, dto.limit);
  }

  public getSatisfaction(dto: SatisfactionQueryDTO): SummaryRO {
    const base = this.patientRepository.getPatients();
    const { start, end } = getDateInterval(dto.range);
    const { patientsData } = base;
    const filtered = patientsData.filter((p) =>
      isWithinInterval(parseISO(p.lastCommunicationDate), { start, end }),
    );

    return {
      summary: {
        negative: filtered.filter((p) => p.satisfaction === 'negative').length,
        neutral: filtered.filter((p) => p.satisfaction === 'neutral').length,
        positive: filtered.filter((p) => p.satisfaction === 'positive').length,
      },
    };
  }
}
