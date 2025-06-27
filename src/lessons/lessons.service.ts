// src/lessons/lessons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async create(
    moduleId: number,
    createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    const lesson = this.lessonsRepository.create({
      ...createLessonDto,
      moduleId,
    });
    return this.lessonsRepository.save(lesson);
  }

  async findAll(moduleId: number): Promise<Lesson[]> {
    return this.lessonsRepository.find({ where: { moduleId } });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOneBy({ id });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    Object.assign(lesson, updateLessonDto);
    return this.lessonsRepository.save(lesson);
  }

  async remove(id: number): Promise<void> {
    await this.lessonsRepository.delete(id);
  }
}
