import { IsNumber } from 'class-validator';

export class ShoppingCartDto {
  @IsNumber()
  carsIds: number[];
}
