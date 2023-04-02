import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    example: 'realrlgus',
  })
  username: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: '권기현',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '기거스',
  })
  @Column()
  nickname: string;

  @ApiProperty({
    example: 'realrlgus@naver.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: false,
  })
  @Column({ default: false, type: 'boolean' })
  deleted: boolean;

  @ApiProperty({
    example: '2023-04-02T04:46:30.267Z',
  })
  @Column({ default: () => 'NOW()', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-04-02T04:46:30.267Z',
  })
  @Column({ default: () => 'NOW()', type: 'timestamp' })
  updatedAt: Date;
}
