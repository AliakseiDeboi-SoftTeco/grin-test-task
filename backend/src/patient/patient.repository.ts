import { Inject, Injectable } from '@nestjs/common';
import { PatientRawDTO } from './dto/patient-raw.dto';
import { DATASET } from '../common/data/data.provider';

@Injectable()
export class PatientRepository {
  constructor(
    @Inject(DATASET)
    private readonly dataset: { patientsSatisfaction: PatientRawDTO },
  ) {}

  public getPatients(): PatientRawDTO {
    return this.dataset.patientsSatisfaction;
  }
}
