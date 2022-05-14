import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './features/catalog/catalog.module';
import { Catalog } from './features/catalog/entities/catalog.entity';
import { User } from './features/user/entities/user.entity';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './auth/auth.module';
import { Role } from './features/roles/entities/role.entity';
import { RolesModule } from './features/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: +process.env.POSTGRESS_PORT, // преобразование в число тк с файла достаем строку
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      entities: [User, Catalog, Role],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CatalogModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
