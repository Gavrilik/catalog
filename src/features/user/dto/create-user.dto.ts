import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

//обмен данными между клинентом и сервером или сервер сервер
export class CreateUserDto {
  // что энд поинт ожидает на входе
  @IsString({ message: 'Введите имя' })
  @ApiProperty()
  name: string;

  @IsEmail({ message: 'Не верный ввод email' })
  @ApiProperty()
  readonly email: string;

  @IsNumber({}, { message: 'введите телефон формата(33 1234567)' })
  @ApiProperty()
  phone: number;

  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty()
  @Length(4, 16, {
    // задаем мин и макс длинну пароля
    message: ' пароль должен быть не меньше 4 и не больше 16 символов',
  })
  readonly password: string;

  @IsString({ message: 'генерируется автоматически' })
  @ApiProperty()
  carsIds: number[];
}
