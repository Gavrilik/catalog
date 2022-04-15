import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  idUser: string;
}
