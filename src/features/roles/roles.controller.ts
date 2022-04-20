import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  create(@Body() createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);
    return this.rolesService.createRole(createRoleDto);
  }

  @Get('/:value')
  @ApiOperation({ summary: 'Получение ролей' })
  @ApiResponse({ status: 200, type: Role })
  async getByValue(@Param('value') value: string) {
    return await this.rolesService.getRoleByValue(value);
  }
}
