import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
