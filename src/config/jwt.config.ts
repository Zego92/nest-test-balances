// Core
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      global: true,
      secret: this.config.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: this.config.get<string>('JWT_EXP_H'),
      },
      privateKey: this.config.get<string>('JWT_SECRET'),
    };
  }
}
