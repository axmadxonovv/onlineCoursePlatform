import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateAssignmentGradeDto {
  @ApiProperty({ example: 90, description: 'Baholash balli (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number;
}
