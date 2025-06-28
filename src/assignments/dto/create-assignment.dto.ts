// src/assignments/dto/create-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Yozma topshiriq matni' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1, description: 'Module ID' })
  @IsNumber()
  moduleId: number;
}
