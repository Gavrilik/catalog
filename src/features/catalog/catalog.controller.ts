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
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Отображение всего каталога' })
  @ApiResponse({ status: 200, type: [Catalog] })
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отображение записи по id' })
  @ApiResponse({ status: 200, type: Catalog })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование записи' })
  @ApiResponse({ status: 200, type: Catalog })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи по id' })
  @ApiResponse({ status: 200, type: Catalog })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.catalogService.remove(+id);
  }
}
