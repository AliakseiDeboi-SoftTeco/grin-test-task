import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TaskDTO {
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
