import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from 'src/features/roles/roles.service';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Регистрация/Авторизация пользователей')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Вход в учетную запись' })
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  async registration(@Body() createUserDto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('User'); //поиск роли по значению(по умолчанию присваеваем роль User)
    const userRole = { ...createUserDto, role };
    console.log(userRole);
    return this.authService.registration(userRole);
  }
}
