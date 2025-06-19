import {IsInt, IsNotEmpty} from "class-validator";

export class SummaryDTO {
    @IsNotEmpty()
    @IsInt()
    negative: number;

    @IsNotEmpty()
    @IsInt()
    neutral: number;

    @IsNotEmpty()
    @IsInt()
    positive: number;
}