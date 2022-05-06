import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogService } from '../catalog/catalog.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private catalogService: CatalogService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['catalogs'] });
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id, { relations: ['roles'] });
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
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    }); // поиск пользователя по email
  }

  async addInCart(userId: number, shoppingCartDto: ShoppingCartDto) {
    const catalogs = await this.catalogService.findByIds(
      // поиск массива машин по id
      shoppingCartDto.carsIds,
    );
    const user = await this.userRepository.findOne(userId); // поик пользователя
    const userCart = await this.userRepository.save({ ...user, catalogs }); //сохраняем машины у пользователя
    return userCart.catalogs;
  }
}
