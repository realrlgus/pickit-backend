import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authUserDto: AuthUserDto) {
    const { username, password } = authUserDto;
    const user = await this.userService.findOneUserByUsername(username);

    if (user && (await compare(password, user.password))) {
      return await this.login(user);
    }

    return;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return {
      data: {
        token: this.jwtService.sign(payload),
      },
    };
  }
}
