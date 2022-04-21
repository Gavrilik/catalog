import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.roleService.getRoleByValue('User'); //поиск роли по значению(по умолчанию присваеваем роль User)
    console.log(role);

    // await user ('roles', [role.id]);
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update(+id, updateUserDto);
    return this.userRepository.findOne(id);
  }

  remove(id: number) {
    this.userRepository.delete(id);
    return this.userRepository.findOne(id);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } }); // поиск пользователя по email
  }
}
