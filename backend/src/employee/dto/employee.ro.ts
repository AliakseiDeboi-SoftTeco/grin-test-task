import {EmployeeDTO} from "./employee.dto";
import {IsArray, IsInt, IsNotEmpty} from "class-validator";

export class EmployeeRO {
    @IsNotEmpty()
    @IsArray()
    items: EmployeeDTO[];

    @IsInt()
    @IsNotEmpty()
    total: number;
}