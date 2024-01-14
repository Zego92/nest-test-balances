// Core
import {
  ThrottlerOptionsFactory,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ThrottleConfigService implements ThrottlerOptionsFactory {
  @Inject(ConfigService) private readonly config: ConfigService;

  public createThrottlerOptions():
    | Promise<ThrottlerModuleOptions>
    | ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          ttl: this.config.get<number>('THROTTLE_TTL'),
          limit: this.config.get<number>('THROTTLE_LIMIT'),
        },
      ],
    };
  }
}
