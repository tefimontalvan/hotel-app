import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
require("dotenv").config();

@Module({
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtStrategy,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '100s' },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
  ],
  exports: [AuthService],
})

export class AuthModule {}
