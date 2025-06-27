// src/lessons/entities/lesson.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Module } from '../../modules/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => Module, (module) => module.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moduleId' })
  module: Module;
}
