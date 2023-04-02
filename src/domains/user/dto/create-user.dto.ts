import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자명(로그인시 사용)',
    example: 'realrlgus',
  })
  readonly username: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'pickit0000',
  })
  readonly password: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '이름',
    example: '권기현',
  })
  readonly name: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '닉네임',
    example: '기거스',
  })
  readonly nickname: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    example: 'realrlgus@naver.com',
  })
  readonly email: string;
}
