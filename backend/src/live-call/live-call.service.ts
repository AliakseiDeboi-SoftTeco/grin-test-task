import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import { LiveCallRepository } from './live-call.repository';
import { LiveCallQueryDTO } from './dto/live-call-query.dto';
import { getDateInterval } from '../common/utils/date-range';
import { LiveCallRO } from './dto/live-call.ro';
import { MINUTES_SAVED_PER_MEETING } from '../common/consts/consts';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class LiveCallService {
  constructor(private readonly liveCallRepository: LiveCallRepository) {}

  public findAll(dto: LiveCallQueryDTO): LiveCallRO {
    const base = this.liveCallRepository.getLiveCalls();
    const { start, end } = getDateInterval(dto.range);
    let filtered = base.filter((lc) =>
      isWithinInterval(parseISO(lc.createdAt), { start, end }),
    );

    const { total, items } = paginate(filtered, dto.page, dto.limit);
    const timeSaved = total * MINUTES_SAVED_PER_MEETING;
    return { total, timeSaved, items };
  }
}
