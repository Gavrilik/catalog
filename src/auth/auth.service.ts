import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { UserService } from 'src/features/user/user.service';
import * as bcrypt from 'bcryptjs'; //модуль для хэширование пароля
import { User } from 'src/features/user/entities/user.entity';
import { RolesService } from 'src/features/roles/roles.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private roleService: RolesService,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateToken(user); //ркзультат выполнения дженерейттокена передали usera
  }

  //регистрация пользвоателя
  async registration(createUserDto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('User'); //поиск роли по значению(по умолчанию присваеваем роль User)
    const createUser = { ...createUserDto, role };
    const candidate = await this.userService.getUserByEmail(createUser.email); //нашли пользователя по email
    if (candidate) {
      throw new HttpException( // если существует пользователь ошибка
        'пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(createUser.password, 5); // 1 параметр пароль, 2 параметр соль
    const user = await this.userService.create({
      // создание пользователя с хэш паролем, развернули дто и перезаписали пароль
      ...createUser,
      password: hashPassword,
    });
    return this.generateToken(user); //создание тоена
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles }; // внутри токена храним email и id
    return { token: this.jwtService.sign(payload) }; // из функции возвращаем сгенерированый токен
  }

  private async validateUser(createUserDto: CreateUserDto) {
    //функция приватна будет использоватся только внутри сервиса
    const user = await this.userService.getUserByEmail(createUserDto.email);
    const passwordEquals = await bcrypt.compare(
      createUserDto.password,
      user.password,
    ); //проверка на совпадение пароля (1 параметр пароль из дто 2 параметр пароль от пользователя)
    if (user && passwordEquals) {
      console.log(user);

      //проверка если пользователь и пароль совпадают возвр. пользователя
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некоректный email или пароль',
    });
  }
}
