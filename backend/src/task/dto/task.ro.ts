import {IsArray, IsInt, IsNotEmpty} from "class-validator";
import {TaskDTO} from "./task.dto";

export class TaskRO {
    @IsNotEmpty()
    @IsArray()
    items: TaskDTO[];

    @IsInt()
    @IsNotEmpty()
    total: number;
}