import { Controller, Get, Query } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationQueryDTO } from './dto/communication-query.dto';

@Controller('communications')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get()
  public findAll(@Query() query: CommunicationQueryDTO) {
    return this.communicationService.findAll(query);
  }
}
