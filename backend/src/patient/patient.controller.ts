import { Controller, Get, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientQueryDTO } from './dto/patient-query.dto';

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    public findAll(@Query() query: PatientQueryDTO) {
        return this.patientService.findAll(query);
    }
}