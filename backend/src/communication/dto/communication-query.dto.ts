import { QueryDTO } from "../../common/dto/query.dto";
import {CommunicationTypeEnum} from "../enum/communication-type.enum";
import {IsEnum, IsOptional} from "class-validator";

export class CommunicationQueryDTO extends QueryDTO {
    @IsOptional()
    @IsEnum(CommunicationTypeEnum)
    type?: CommunicationTypeEnum;
}
