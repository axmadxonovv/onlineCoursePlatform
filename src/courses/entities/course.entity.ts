// src/courses/entities/course.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Module as CourseModule } from '../../modules/entities/module.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  teacher: string;

  @Column()
  @ApiProperty()
  category: string;

  @Column()
  @ApiProperty()
  level: string;

  @OneToMany(() => CourseModule, (module) => module.course)
  modules: CourseModule[];
}
