import { Inject, Injectable } from '@nestjs/common';
import { LiveCallDTO } from './dto/live-call.dto';
import { DATASET } from '../common/data/data.provider';

@Injectable()
export class LiveCallRepository {
  constructor(
    @Inject(DATASET)
    private readonly dataset: { liveCalls: LiveCallDTO[] },
  ) {}

  public getLiveCalls(): LiveCallDTO[] {
    return this.dataset.liveCalls;
  }
}
