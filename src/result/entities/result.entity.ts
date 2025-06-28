import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column({ nullable: true })
  feedback: string;

  @ManyToOne(() => Assignment, (assignment) => assignment.results, {
    onDelete: 'CASCADE',
  })
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results)
  student: User;
}
