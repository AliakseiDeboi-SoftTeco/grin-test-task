import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientSatisfactionController } from './patient-satisfaction.controller';
import { PatientRepository } from './patient.repository';

@Module({
  controllers: [PatientController, PatientSatisfactionController],
  providers: [PatientService, PatientRepository],
})
export class PatientModule {}
