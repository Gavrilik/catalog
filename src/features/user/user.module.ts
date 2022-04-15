import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Catalog } from '../catalog/entities/catalog.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from '../roles/entities/role.entity';
import { UserRoles } from '../roles/entities/user-roles';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Catalog, Role, UserRoles]),
    forwardRef(() => AuthModule),
    RolesModule,
    // предотвращение кольцевой зависимости
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
