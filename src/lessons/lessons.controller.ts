// src/lessons/lessons.controller.ts
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@ApiTags('lessons')
@Controller('modules/:moduleId/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  createLesson(
    @Param('moduleId') moduleId: number,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(moduleId, createLessonDto);
  }

  @Get()
  getLessons(@Param('moduleId') moduleId: number) {
    return this.lessonsService.findAll(moduleId);
  }

  @Get(':id')
  getLesson(@Param('id') id: number) {
    return this.lessonsService.findOne(id);
  }

  @Put(':id')
  updateLesson(
    @Param('id') id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  deleteLesson(@Param('id') id: number) {
    return this.lessonsService.remove(id);
  }
}
