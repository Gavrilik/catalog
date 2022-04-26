import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest(); //объект req из контекста
      const authHeader = req.headers.authorization; // достаем header который называется authorization(состоит из 2ух частей типо токена и сам токен)
      const bearer = authHeader.split(' ')[0]; //тип токена(токен делим на 2 части спомощью метода split)
      const token = authHeader.split(' ')[1]; //токен(делим с помощью пробелов, получается массив из 2 ух объектов )
      if (bearer !== 'Bearer' || !token) {
        // проверка на ошибки(1 если бирер не равняется бирер или нет токена )
        throw new UnauthorizedException({
          //вывод ошибки
          message: 'Пользователь не авторизирован',
        });
      }
      const user = this.jwtService.verify(token); //расскадировка токена
      req.user = user; // помещаем user в реквест
      return user.roles.some((role) => requiredRoles.includes(role.value)); // возвращаем true ( если true значит доступ разрешен)
    } catch (e) {
      throw new HttpException(
        //вывод ошибки
        'У пользователя нет доступа',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
