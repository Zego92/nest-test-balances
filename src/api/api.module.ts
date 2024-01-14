// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthModule } from '@/api/auth';
import { ClientModule } from '@/api/client';
import { RoutesModule } from '@/api/routes';
import { UsersModule } from '@/api/users';

@Module({
  imports: [AuthModule, ClientModule, UsersModule, RoutesModule],
})
export class ApiModule {}
