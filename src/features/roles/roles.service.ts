import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto);
  }

  getRoleByValue(value: string) {
    this.roleRepository.findOne({ where: { value } });
  }
}
