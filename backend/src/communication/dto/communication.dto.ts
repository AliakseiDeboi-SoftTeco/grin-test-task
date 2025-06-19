import {IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID} from "class-validator";
import {CommunicationTypeEnum} from "../enum/communication-type.enum";

export class CommunicationDTO {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    entityType: string;

    @IsNotEmpty()
    @IsDateString()
    createdAt: string;

    @IsNotEmpty()
    @IsEnum(CommunicationTypeEnum)
    type: CommunicationTypeEnum;
}