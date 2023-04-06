import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Pickit 사용자의 모든 정보를 가져옵니다.',
    type: User,
    isArray: true,
  })
  async findAll() {
    return await this.userService.findAllUser();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Pickit 사용자의 정보를 생성합니다.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async createOne(@Body() user: CreateUserDto) {
    return await this.userService.createOneUser(user);
  }
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Pickit 사용자의 정보를 업데이트합니다.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async updateOne(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return await this.userService.updateOneUser(id, user);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Pickit 사용자의 정보를 제거합니다.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async deleteOne(@Body() user: DeleteUserDto) {
    return await this.userService.deleteOneUser(user);
  }
}
