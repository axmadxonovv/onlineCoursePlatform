// src/lessons/lessons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { Module } from '../modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepo: Repository<Lesson>,

    @InjectRepository(Module)
    private modulesRepo: Repository<Module>,
  ) {}

  async create(moduleId: number, data: Partial<Lesson>) {
    const module = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!module) throw new NotFoundException('Module not found');

    const lesson = this.lessonsRepo.create({ ...data, module });
    return this.lessonsRepo.save(lesson);
  }

  async findAllByModule(moduleId: number) {
    return this.lessonsRepo.find({
      where: { module: { id: moduleId } },
    });
  }

  async findOne(id: number) {
    const lesson = await this.lessonsRepo.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: number, data: Partial<Lesson>) {
    const lesson = await this.findOne(id);
    Object.assign(lesson, data);
    return this.lessonsRepo.save(lesson);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return this.lessonsRepo.remove(lesson);
  }
}
