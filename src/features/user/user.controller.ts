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
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

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
  async findAll(): Promise<Partial<User>[]> {
    const users: User[] = await this.userService.findAll();
    const usersWithoutPass = users.map(function (userObj) {
      const { password, ...rest } = userObj;
      return rest;
    });
    return usersWithoutPass;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string) {
    const user: User = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    const { password, ...rest } = user;
    return rest;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление пользователя ' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const user: User = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userService.remove(+id);
  }
}
