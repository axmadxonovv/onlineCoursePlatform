// src/modules/entities/module.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, (course) => course.modules, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  @OneToMany(() => Assignment, (assignment) => assignment.module)
  assignments: Assignment[];
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  teacher: User;

  @Column({ nullable: true })
  teacherId: number;
}
