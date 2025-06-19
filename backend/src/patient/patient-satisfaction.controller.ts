import { Controller, Get, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { SatisfactionQueryDTO } from './dto/satisfaction-query.dto';

@Controller('patients/satisfaction')
export class PatientSatisfactionController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  public getSatisfaction(@Query() dto: SatisfactionQueryDTO) {
    return this.patientService.getSatisfaction(dto);
  }
}
