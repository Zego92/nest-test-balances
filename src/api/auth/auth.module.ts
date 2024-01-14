// Core
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { AuthController } from './auth.controller';

// Entities
import { UserBalanceEntity } from '@/database/entities';

// Modules
import { UsersModule } from '@/api/users';

// Services
import { AuthService } from './auth.service';
import { JwtConfigService } from '@/services';
import { UserBalancesService } from '@/api/client/user-balances';

// Strategies
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBalanceEntity]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    } as JwtModuleAsyncOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, UserBalancesService],
})
export class AuthModule {}
