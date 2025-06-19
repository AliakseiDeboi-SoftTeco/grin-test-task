import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {PatientRawDTO} from "./dto/patient-raw.dto";

@Injectable()
export class PatientRepository {
    private readonly patients: PatientRawDTO;

    constructor() {
        const raw = readFileSync(
            join(__dirname, '..', '..', 'data', 'dataset.json'),
            'utf8',
        );
        this.patients = JSON.parse(raw).patientsSatisfaction;
    }

    public getPatients(): PatientRawDTO {
        return this.patients;
    }
}