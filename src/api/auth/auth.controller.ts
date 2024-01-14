// Core
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

// Decorators
import { LoginUserDecorator } from '@/decorators';

// DTO
import { LoginDto, RegisterDto } from '@/api/auth/dto';

// Entities
import { UserEntity } from '@/database/entities';

// Guards
import { JwtAuthGuard } from '@/api/auth/guards';

// Pipes
import { LoginPipe, RegisterPipe } from '@/api/auth/pipes';

// Services
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService) private readonly authService: AuthService;

  @UsePipes(new LoginPipe())
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UsePipes(new RegisterPipe())
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@LoginUserDecorator() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
