// Core
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compare } from 'bcrypt';

// Entities
import { UserEntity } from '@/database/entities';

// Services
import { UsersService } from '@/api/users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor() {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserEntity | UnauthorizedException> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException({
        message: `The user with ${email} is not exist`,
      });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException({ message: 'Invalid password' });
    }

    return user;
  }
}
