import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { UserDto, UserListDto } from './user.mapper';

@ApiTags('Пользователи') //Тег
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // внедрение зависимости(dependency enjection)

  @Post('cart')
  @UseGuards(JwtAuthGuard, RolesGuard)
  addInCart(@Request() req, @Body() shoppingCartDto: ShoppingCartDto) {
    const userId = req.user.id;
    return this.userService.addInCart(userId, shoppingCartDto);
  }

  @Roles('User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll(): Promise<UserListDto> {
    const users: User[] = await this.userService.findAll();
    return new UserListDto(users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user: User = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
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
    const updatedUser = await this.userService.update(+id, updateUserDto);
    return new UserDto(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<UserDto> {
    const user: User = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userService.remove(+id).then(() => new UserDto(user));
  }
}
