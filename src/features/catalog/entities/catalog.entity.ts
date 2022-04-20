import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/features/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 'генерируется уникальный' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Марка автомобиля' })
  brend: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Модель автомобиля' })
  model: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Цвет автомобиля' })
  color: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Цена автомобиля' })
  price: number;
}
