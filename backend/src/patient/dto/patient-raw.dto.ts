import {SummaryDTO} from "./summary.dto";
import {IsArray, IsNotEmpty, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {PatientDTO} from "./patient.dto";

export class PatientRawDTO {
    @IsNotEmpty()
    @Type(() => SummaryDTO)
    @ValidateNested()
    summary: SummaryDTO;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    patientsData: PatientDTO[];
}