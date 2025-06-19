import { Inject, Injectable } from '@nestjs/common';
import { CommunicationDTO } from './dto/communication.dto';
import { DATASET } from '../common/data/data.provider';

@Injectable()
export class CommunicationRepository {
  constructor(
    @Inject(DATASET)
    private readonly dataset: { communication: CommunicationDTO[] },
  ) {}

  public getCommunications(): CommunicationDTO[] {
    return this.dataset.communication;
  }
}
