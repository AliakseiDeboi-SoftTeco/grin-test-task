import { PatientDTO } from './patient.dto';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class PatientRO {
  @IsNotEmpty()
  @IsArray()
  items: PatientDTO[];

  @IsInt()
  @IsNotEmpty()
  total: number;
}
