import { IsNumber, IsString } from 'class-validator';

export class CreateCatalogDto {
  @IsString({ message: 'Ведите марку автомобиля строкой' })
  brend: string;

  @IsString({ message: 'Ведите модель автомобиля строкой' })
  model: string;

  @IsString({ message: 'Ведите цвет автомобиля строкой' })
  color: string;

  @IsNumber({}, { message: 'Введите цену автомобиля числом' })
  price: number;

  userIds: number[];
}
