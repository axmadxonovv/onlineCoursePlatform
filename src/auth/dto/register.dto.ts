import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  name: string;

  @ApiProperty({ example: 'ali@example.com' })
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  password: string;
}
