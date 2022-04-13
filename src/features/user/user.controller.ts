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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // внедрение зависимости(dependency enjection)

  @Post() // эндпоит для пользователей
  @UseGuards(JwtAuthGuard) //использовали useguard(для защиты от неавторизированых пользователей)
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    // тело запроса принимает createuserdto
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
