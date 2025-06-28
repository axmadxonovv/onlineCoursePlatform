import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Module } from '../../modules/entities/module.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  grade: number;

  @ManyToOne(() => Module, (module) => module.assignments)
  @JoinColumn({ name: 'moduleId' })
  module: Module;

  @Column()
  moduleId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'studentId' })
  student: User;

  @Column()
  studentId: number;
}
