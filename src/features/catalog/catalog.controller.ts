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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.catalogService.remove(+id);
  }
}
