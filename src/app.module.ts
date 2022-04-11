import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './features/catalog/catalog.module';
import { Catalog } from './features/catalog/entities/catalog.entity';
import { User } from './features/user/entities/user.entity';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT), // преобразование в число тк с файла достаем строку
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      entities: [User, Catalog],
      synchronize: true,
    }),
    UserModule,
    CatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
