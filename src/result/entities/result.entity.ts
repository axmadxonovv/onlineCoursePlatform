import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment)
  assignment: Assignment;

  @ManyToOne(() => User)
  student: User;

  @Column()
  answer: string;

  @Column({ nullable: true })
  grade?: number;
}
