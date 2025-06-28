import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @IsInt()
  assignmentId: number;

  @IsInt()
  grade: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
