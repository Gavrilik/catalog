import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/features/user/entities/user.entity';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  brend: string;

  @Column({ nullable: false })
  model: string;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  price: number;

  @ManyToMany(() => User, (user) => user.catalogs)
  users: User[];
}
