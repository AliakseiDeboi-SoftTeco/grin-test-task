import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import { CommunicationRepository } from './communication.repository';
import { CommunicationQueryDTO } from './dto/communication-query.dto';
import { getDateInterval } from '../common/utils/date-range';
import { CommunicationRO } from './dto/communication.ro';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class CommunicationService {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  public findAll(dto: CommunicationQueryDTO): CommunicationRO {
    const base = this.communicationRepository.getCommunications();

    const { start, end } = getDateInterval(dto.range);
    let filtered = base.filter((lc) =>
      isWithinInterval(parseISO(lc.createdAt), { start, end }),
    );

    if (dto.type) {
      filtered = filtered.filter((item) => item.type === dto.type);
    }

    return paginate(filtered, dto.page, dto.limit);
  }
}
