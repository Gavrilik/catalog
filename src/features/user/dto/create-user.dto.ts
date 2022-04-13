import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

//обмен данными между клинентом и сервером или сервер сервер
export class CreateUserDto {
  @IsString({ message: 'Введите имя' })
  name: string;

  @IsEmail({ message: 'Не верный ввод email' })
  readonly email: string;

  @IsNumber({}, { message: 'введите телефон формата(33 1234567)' })
  phone: number;

  @IsString({ message: 'Должен быть строкой' })
  @Length(4, 16, {
    // задаем мин и макс длинну пароля
    message: 'пароль должен быть не меньше 4 и не больше 16 символов',
  })
  readonly password: string;

  carsIds: number[];
}
