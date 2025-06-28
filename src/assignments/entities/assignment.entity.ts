import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Module } from '../../modules/entities/module.entity';
import { User } from '../../users/user.entity';
import { Result } from 'src/result/entities/result.entity';
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

  @OneToMany(() => Result, (result) => result.assignment)
  results: Result[];
}
