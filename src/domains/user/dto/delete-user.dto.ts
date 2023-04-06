import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 아이디',
    example: '5',
  })
  readonly id: number;
}
