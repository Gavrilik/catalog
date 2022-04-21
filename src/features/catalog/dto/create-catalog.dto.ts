import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatalogDto {
  @IsString({ message: 'Ведите марку автомобиля строкой' })
  @ApiProperty()
  brend: string;

  @IsString({ message: 'Ведите модель автомобиля строкой' })
  @ApiProperty()
  model: string;

  @IsString({ message: 'Ведите цвет автомобиля строкой' })
  @ApiProperty()
  color: string;

  @IsNumber({}, { message: 'Введите цену автомобиля числом' })
  @ApiProperty()
  price: number;
}
