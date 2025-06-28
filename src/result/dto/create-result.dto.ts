import { IsInt, IsString } from 'class-validator';

export class CreateResultDto {
  @IsInt()
  assignmentId: number;

  @IsString()
  answer: string;
}
