import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  HttpException,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import e from 'express';

@ApiTags('Пользователи') //Тег
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // внедрение зависимости(dependency enjection)

  @Post() // эндпоит для пользователей
  @ApiOperation({ summary: 'Создание пользователя' }) // описание
  @ApiResponse({ status: 200, type: User }) // описывает статус и какие данные вернет
  @UseGuards(JwtAuthGuard) //использовали useguard(для защиты от неавторизированых пользователей)
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    // тело запроса принимает createuserdto
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const hidePass: User[] = await this.userService.findAll();
    const [{ password, ...rest }] = hidePass;
    return rest;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string) {
    const hidePass: User = await this.userService.findOne(+id);
    const { password, ...rest } = hidePass || {
      message: 'нету пользователя с таким id',
    };
    return rest;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление пользователя ' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
