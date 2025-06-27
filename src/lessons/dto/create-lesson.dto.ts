// src/lessons/dto/create-lesson.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'Lesson 1: Introduction' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the lesson content', required: false })
  @IsOptional()
  content?: string;
}
