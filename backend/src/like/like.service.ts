import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import { LikeRepository } from './like.repository';
import { LikeQueryDTO } from './dto/like-query.dto';
import { getDateInterval } from '../common/utils/date-range';
import { LikeRO } from './dto/like.ro';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public findAll(dto: LikeQueryDTO): LikeRO {
    const base = this.likeRepository.getLikes();

    const { start, end } = getDateInterval(dto.range);
    let filtered = base.filter((lc) =>
      isWithinInterval(parseISO(lc.createdAt), { start, end }),
    );

    return paginate(filtered, dto.page, dto.limit);
  }
}
