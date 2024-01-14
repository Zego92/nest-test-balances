// Core
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Entities
import { UserEntity } from '@/database/entities';

export const LoginUserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
