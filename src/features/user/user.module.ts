import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Catalog } from '../catalog/entities/catalog.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from '../roles/entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Catalog, Role]),
    forwardRef(() => AuthModule),
    RolesModule,
    forwardRef(() => CatalogModule),
    // предотвращение кольцевой зависимости
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
