import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers.authorization.split(' ')[1];
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken;
      return true;
    } catch (e) {
      console.log(e);
    }

    return false;
  }
}
