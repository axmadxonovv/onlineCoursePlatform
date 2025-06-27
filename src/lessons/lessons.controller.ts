// src/lessons/lessons.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('/modules/:moduleId/lessons')
  create(@Param('moduleId', ParseIntPipe) moduleId: number, @Body() body: any) {
    return this.lessonsService.create(moduleId, body);
  }

  @Get('/modules/:moduleId/lessons')
  findByModule(@Param('moduleId', ParseIntPipe) moduleId: number) {
    return this.lessonsService.findAllByModule(moduleId);
  }

  @Get('/lessons/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Put('/lessons/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.lessonsService.update(id, body);
  }

  @Delete('/lessons/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }
}
