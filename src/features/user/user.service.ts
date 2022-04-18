import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    const users: User[] = await this.userRepository.find();
    const [...rest] = users;
    //console.log([...rest]);
    return rest;
  }

  async findOne(id: number) {
    const users: User = await this.userRepository.findOne(id);
    const { password, ...rest } = users;
    return rest;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update(id, updateUserDto);
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
