// src/assignments/assignments.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
  ) {}

  async create(
    createAssignmentDto: CreateAssignmentDto,
    studentId: number,
  ): Promise<Assignment> {
    const assignment = this.assignmentsRepository.create({
      ...createAssignmentDto,
      studentId,
    });
    return this.assignmentsRepository.save(assignment);
  }

  async gradeAssignment(
    assignmentId: number,
    teacherId: number,
    grade: number,
  ): Promise<Assignment> {
    const assignment = await this.assignmentsRepository.findOne({
      where: { id: assignmentId },
      relations: ['module', 'module.teacher'],
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    if (assignment.module.teacher.id !== teacherId) {
      throw new ForbiddenException(
        'Siz ushbu topshiriqni baholashga ruxsatga ega emassiz',
      );
    }

    assignment.grade = grade;
    return this.assignmentsRepository.save(assignment);
  }

  async findByStudent(studentId: number): Promise<Assignment[]> {
    return this.assignmentsRepository.find({
      where: { studentId },
      relations: ['module'],
    });
  }
}
