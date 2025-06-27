import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() dto: CreateModuleDto) {
    return this.modulesService.create(dto);
  }

  @Get('/course/:courseId')
  findByCourse(@Param('courseId') courseId: number) {
    return this.modulesService.findByCourse(courseId);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.modulesService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateModuleDto) {
    return this.modulesService.update(id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.modulesService.remove(id);
  }
}
