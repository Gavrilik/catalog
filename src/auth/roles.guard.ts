import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private JwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requireRoles) {
        // если нет ролей функция будет доступна всем пользователям
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const { user } = req;
      console.log(user);
      return requireRoles.includes(user.roles.value);
    } catch (e) {
      throw new HttpException('нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
