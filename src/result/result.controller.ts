import { Controller, UseGuards, Post, Get, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultService } from './result.service';

@UseGuards(JwtAuthGuard)
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @Roles('student')
  async create(@Body() dto: CreateResultDto) {
    return this.resultService.create(dto);
  }

  @Get()
  @Roles('student')
  async findByStudent(@Req() req) {
    return this.resultService.findByStudent(req.user.id);
  }
}
