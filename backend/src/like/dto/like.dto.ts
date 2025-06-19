import {IsDateString, IsNotEmpty, IsString, IsUUID} from "class-validator";

export class LikeDTO {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    entityType: string;

    @IsNotEmpty()
    @IsDateString()
    createdAt: string;
}