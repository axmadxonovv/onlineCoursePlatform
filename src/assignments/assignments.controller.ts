// src/assignments/assignments.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentGradeDto } from './dto/update-assignment-grade.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

@ApiTags('assignments')
@ApiBearerAuth()
@Controller('modules/:moduleId/assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Post()
  createAssignment(
    @Body() dto: CreateAssignmentDto,
    @Req() req: Request & { user: User },
  ) {
    return this.assignmentsService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Put(':id/grade')
  gradeAssignment(
    @Param('id', ParseIntPipe) assignmentId: number,
    @Body() dto: UpdateAssignmentGradeDto,
    @Req() req: Request & { user: User },
  ) {
    return this.assignmentsService.gradeAssignment(
      assignmentId,
      req.user.id,
      dto.grade,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getStudentAssignments(@Req() req: Request & { user: User }) {
    return this.assignmentsService.findByStudent(req.user.id);
  }
}
