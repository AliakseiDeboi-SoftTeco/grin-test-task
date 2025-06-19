import { Inject, Injectable } from '@nestjs/common';
import { LikeDTO } from './dto/like.dto';
import { DATASET } from '../common/data/data.provider';

@Injectable()
export class LikeRepository {
  constructor(
    @Inject(DATASET)
    private readonly dataset: { likes: LikeDTO[] },
  ) {}

  public getLikes(): LikeDTO[] {
    return this.dataset.likes;
  }
}
