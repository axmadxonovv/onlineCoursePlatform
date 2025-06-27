import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  create(dto: CreateCourseDto) {
    const course = this.courseRepo.create(dto);
    return this.courseRepo.save(course);
  }

  findAll() {
    return this.courseRepo.find();
  }
  async update(id: number, dto: CreateCourseDto) {
    await this.courseRepo.update(id, dto);
    const updated = await this.courseRepo.findOneBy({ id });
    if (!updated) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updated;
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  remove(id: number) {
    return this.courseRepo.delete(id);
  }
}
