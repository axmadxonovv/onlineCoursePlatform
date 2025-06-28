import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentGradeDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('assignments')
@ApiBearerAuth()
@Controller('modules/:moduleId/assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post()
  createAssignment(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @Req() req,
  ) {
    // Student ID req.user.id dan olinadi
    return this.assignmentsService.create(createAssignmentDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Put(':id/grade')
  gradeAssignment(
    @Param('id') id: number,
    @Body() updateAssignmentGradeDto: UpdateAssignmentGradeDto,
    @Req() req,
  ) {
    return this.assignmentsService.gradeAssignment(
      id,
      req.user.id,
      updateAssignmentGradeDto.grade,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getStudentAssignments(@Req() req) {
    return this.assignmentsService.findByStudent(req.user.id);
  }
}
