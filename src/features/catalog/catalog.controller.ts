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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './entities/catalog.entity';

@ApiTags('Каталог автомобилей')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Создание новой записи ' })
  @ApiResponse({ status: 200, type: Catalog })
  async create(@Body() createCatalogDto: CreateCatalogDto) {
    return await this.catalogService.create(createCatalogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Отображение всего каталога' })
  @ApiResponse({ status: 200, type: [Catalog] })
  async findAll() {
    return await this.catalogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отображение записи по id' })
  @ApiResponse({ status: 200, type: Catalog })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const catalog: Catalog = await this.catalogService.findOne(+id);
    if (!catalog) {
      throw new HttpException(
        'Автомобиль с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    return catalog;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование записи' })
  @ApiResponse({ status: 200, type: Catalog })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    const catalog: Catalog = await this.catalogService.findOne(+id);
    if (!catalog) {
      throw new HttpException(
        'Автомобиль с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи по id' })
  @ApiResponse({ status: 200, type: Catalog })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const catalog: Catalog = await this.catalogService.findOne(+id);
    if (!catalog) {
      throw new HttpException(
        'Автомобиль с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.catalogService.remove(+id);
  }
}
