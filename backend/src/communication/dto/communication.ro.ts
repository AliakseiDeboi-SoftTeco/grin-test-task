import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { CommunicationDTO } from './communication.dto';

export class CommunicationRO {
  @IsNotEmpty()
  @IsArray()
  items: CommunicationDTO[];

  @IsInt()
  @IsNotEmpty()
  total: number;
}
