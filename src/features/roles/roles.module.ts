import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRoles } from './user-roles';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
