import {SummaryDTO} from "./summary.dto";
import {IsNotEmpty, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class SummaryRO {
    @IsNotEmpty()
    @Type(() => SummaryDTO)
    @ValidateNested()
    summary: SummaryDTO;

}