import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private resultRepo: Repository<Result>,
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createDto: CreateResultDto, studentId: number) {
    const assignment = await this.assignmentRepo.findOne({
      where: { id: createDto.assignmentId },
    });
    const student = await this.userRepo.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const result = this.resultRepo.create({
      assignment: { id: createDto.assignmentId }, // bu yerda to‘g‘ri ko‘rsatiladi
      student,
      answer: createDto.answer,
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
