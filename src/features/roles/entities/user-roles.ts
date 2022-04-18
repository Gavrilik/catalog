import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRoles {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 'генерируется уникальный' })
  id: number;

  @ApiProperty({ example: 'id ролей' })
  @Column()
  roleId: number;

  @ApiProperty({ example: 'id пользователя' })
  @Column()
  idUser: string;
}
