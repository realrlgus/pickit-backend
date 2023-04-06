import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayLoad } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY, // JWT 암호화 키
    });
  }

  async validate(payload: JwtPayLoad): Promise<User> {
    const { sub } = payload;
    const user = await this.userService.findOneUser(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
