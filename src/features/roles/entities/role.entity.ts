import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/features/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '../user-roles';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 'генерируется уникальный' })
  id: number;
  @Column()
  @ApiProperty({ example: 'Admin', description: 'значение роли пользователя' })
  value: string; //значение роли

  @ManyToMany(() => User, () => UserRoles)
  @JoinTable()
  users: User[];
}
