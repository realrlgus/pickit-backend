import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Pickit 사용자의 정보를 제거합니다.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async validateUser(@Body() data: AuthUserDto) {
    return this.authService.validateUser(data);
  }
}
