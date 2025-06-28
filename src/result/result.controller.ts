import { Controller, UseGuards, Post, Get, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultService } from './result.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/users/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  create(@Body() dto: CreateResultDto, @Req() req: Request & { user: User }) {
    return this.resultService.create(dto, req.user.id);
  }

  @Get()
  @Roles('student')
  async findByStudent(@Req() req) {
    return this.resultService.findByStudent(req.user.id);
  }
}
