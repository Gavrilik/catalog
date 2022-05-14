import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Регистрация/Авторизация пользователей')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Вход в учетную запись' })
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
