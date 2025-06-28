import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private resultRepo: Repository<Result>,
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
  ) {}

  async create(createDto: CreateResultDto) {
    const assignment = await this.assignmentRepo.findOne({
      where: { id: createDto.assignmentId },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    const result = this.resultRepo.create({
      ...createDto,
      assignment,
    });

    return this.resultRepo.save(result);
  }

  async findByStudent(studentId: number) {
    return this.resultRepo.find({
      where: { student: { id: studentId } },
      relations: ['assignment'],
    });
  }
}
