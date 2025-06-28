import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ali@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'teacher', enum: ['student', 'admin', 'teacher'] })
  @IsEnum(['student', 'admin', 'teacher'])
  role: 'student' | 'admin' | 'teacher';
}
