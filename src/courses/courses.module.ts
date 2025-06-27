// src/courses/courses.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])], // ❗ Bu yerda ro‘yxatdan o‘tkazyapmiz
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
