import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Post()
  @ApiOperation({ summary: 'Создание роли пользователя' })
  @ApiResponse({ status: 200, type: Role })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.createRole(createRoleDto);
  }

  @Get('/:value')
  @ApiOperation({ summary: 'Получение ролей' })
  @ApiResponse({ status: 200, type: Role })
  async getByValue(@Param('value') value: string) {
    const role: Role = await this.rolesService.getRoleByValue(value);
    if (!role) {
      throw new HttpException('Такой роли не существует', HttpStatus.NOT_FOUND);
    }
    return role;
  }
}
