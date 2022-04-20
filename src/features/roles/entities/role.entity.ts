import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/features/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 'генерируется уникальный' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Значение роли пользователя' })
  value: string; //значение роли

  @OneToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
