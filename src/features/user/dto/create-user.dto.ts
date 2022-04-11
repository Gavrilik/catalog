//обмен данными между клинентом и сервером или сервер сервер
export class CreateUserDto {
  name: string;

  readonly email: string;

  phone: number;

  readonly password: string;
}
