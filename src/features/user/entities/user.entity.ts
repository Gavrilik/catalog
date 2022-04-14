import { ApiProperty } from '@nestjs/swagger';
import { Catalog } from 'src/features/catalog/entities/catalog.entity';
import { Role } from 'src/features/roles/entities/role.entity';
import { UserRoles } from 'src/features/roles/user-roles';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // что возвращает на выходе
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 'генерируется уникальный' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Иван,Сергей' }) // required: false (что бы сделать colum не обязательной )
  name: string;

  @Column({ unique: true, nullable: false })
  @ApiProperty({ example: 'asd@gmail.com' }) //пример
  email: string;

  @Column({ unique: true, nullable: false })
  @ApiProperty({ example: '331234567' })
  phone: number;

  @Column({ nullable: false, select: false })
  @ApiProperty({ example: '1234' })
  password: string;

  @ManyToMany(() => Catalog, (catalog) => catalog.users)
  @JoinTable()
  catalogs: Catalog[];

  @ManyToMany(() => Role, () => UserRoles)
  roles: Role[];
}
