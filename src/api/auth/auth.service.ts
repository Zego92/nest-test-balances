// Core
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { compare } from 'bcrypt';

// DTO
import { LoginDto, RegisterDto } from '@/api/auth/dto';

// Entities
import { UserEntity } from '@/database/entities';

// Services
import { UsersService } from '@/api/users';
import { UserBalancesService } from '@/api/client/user-balances';

@Injectable()
export class AuthService {
  @Inject(UsersService) private readonly usersService: UsersService;
  @Inject(UserBalancesService)
  private readonly userBalanceService: UserBalancesService;
  @Inject(JwtService) private jwtService: JwtService;
  @Inject(ConfigService) private config: ConfigService;
  @Inject(CACHE_MANAGER) private cacheManager: Cache;

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(`The user with ${email} is not exist`);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<object> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    const tokenExpirationTime = this.config.get<number>('JWT_EXP_H');

    const payload = { sub: user.id, email };
    const accessToken = this.jwtService.sign(payload);
    await this.cacheManager.set(
      'access_token',
      accessToken,
      tokenExpirationTime,
    );
    return {
      accessToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<object> {
    return this.usersService
      .create(registerDto)
      .then(async (response) => {
        const { message, user } = response;
        const { id, email } = user;
        const payload = { sub: id, email };

        const tokenExpirationTime = this.config.get<number>('JWT_EXP_H');
        const accessToken = await this.jwtService.signAsync(payload);

        await this.cacheManager.set(
          'access_token',
          accessToken,
          tokenExpirationTime,
        );

        await this.userBalanceService.create({ userId: +user.id });

        return {
          accessToken,
          message,
        };
      })
      .catch((error) => error);
  }
}
