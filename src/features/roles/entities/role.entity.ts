import { User } from 'src/features/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from './user-roles';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: string; //значение роли

  @ManyToMany(() => User, () => UserRoles)
  @JoinTable()
  users: User[];
}
