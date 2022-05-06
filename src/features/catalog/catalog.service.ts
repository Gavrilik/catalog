import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './entities/catalog.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private catalogRepository: Repository<Catalog>,
  ) {}
  create(createCatalogDto: CreateCatalogDto) {
    const catalog = this.catalogRepository.create(createCatalogDto);
    return this.catalogRepository.save(catalog);
  }

  findAll() {
    return this.catalogRepository.find();
  }

  findOne(id: number) {
    return this.catalogRepository.findOne(id);
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    this.catalogRepository.update(id, updateCatalogDto);
    return this.catalogRepository.findOne(id);
  }

  remove(id: number) {
    this.catalogRepository.delete(id);
    return this.catalogRepository.findOne(id);
  }

  findByIds(carsIds: number[]) {
    return this.catalogRepository.findByIds(carsIds);
  }
}
