import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  teacher: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  level: string;
}
