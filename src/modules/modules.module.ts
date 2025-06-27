import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Module as CourseModuleEntity } from './entities/module.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModuleEntity, Course])],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
