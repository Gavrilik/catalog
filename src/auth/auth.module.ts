import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/features/user/user.module';
import { RolesModule } from 'src/features/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RolesModule,
    UserModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET', // секретный ключ записан в конфиг
      signOptions: { expiresIn: '24h' }, // время действия токена
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
