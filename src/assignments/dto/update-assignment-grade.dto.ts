// src/assignments/dto/update-assignment-grade.dto.ts
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateAssignmentGradeDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number;
}
