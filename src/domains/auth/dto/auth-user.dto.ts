import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자명',
    example: 'realrlgus',
  })
  readonly username: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'pickit0000',
  })
  readonly password: string;
}
