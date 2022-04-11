import { Catalog } from 'src/features/catalog/entities/catalog.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone: number;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Catalog, (catalog) => catalog.users)
  @JoinTable()
  catalogs: Catalog[];
}
