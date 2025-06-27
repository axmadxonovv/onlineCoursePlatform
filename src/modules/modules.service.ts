import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from './entities/module.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(dto: CreateModuleDto) {
    const course = await this.courseRepository.findOneBy({ id: dto.courseId });
    if (!course) throw new NotFoundException('Course not found');
    const module = this.moduleRepository.create({ title: dto.title, course });
    return this.moduleRepository.save(module);
  }

  async findByCourse(courseId: number) {
    return this.moduleRepository.find({
      where: { course: { id: courseId } },
      relations: ['lessons'],
    });
  }

  async findOne(id: number) {
    return this.moduleRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });
  }

  async update(id: number, dto: UpdateModuleDto) {
    const module = await this.moduleRepository.findOneBy({ id });
    if (!module) throw new NotFoundException('Module not found');
    Object.assign(module, dto);
    return this.moduleRepository.save(module);
  }

  async remove(id: number) {
    const module = await this.moduleRepository.findOneBy({ id });
    if (!module) throw new NotFoundException('Module not found');
    return this.moduleRepository.remove(module);
  }
}
