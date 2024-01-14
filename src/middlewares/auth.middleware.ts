// Core
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject(CACHE_MANAGER) private cacheManager: Cache;

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const accessToken = await this.cacheManager.store.get('access_token');

    if (!token && !accessToken) {
      throw new UnauthorizedException();
    }

    next();
  }
}
