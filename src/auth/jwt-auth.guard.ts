import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest(); //объект req из контекста
    try {
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
      return true; // возвращаем true ( если true значит доступ разрешен)
    } catch (e) {
      throw new UnauthorizedException({
        //вывод ошибки
        message: 'Пользователь не авторизирован',
      });
    }
  }
}
