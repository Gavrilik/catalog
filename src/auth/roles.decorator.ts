import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); //функция Roles(она будет декоратором) параметром принимает массив ролей вызываем функцию метадата(ключ и массив ролей)
