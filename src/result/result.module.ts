// result.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Assignment]), UsersModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultsModule {}
