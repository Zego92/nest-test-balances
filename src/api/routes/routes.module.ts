// Core
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

// Modules
import { AuthModule } from '@/api/auth';
import { ClientModule } from '@/api/client';
import { UserBalancesModule } from '@/api/client/user-balances';
import { UserTransactionsModule } from '@/api/client/user-transactions';

@Module({
  imports: [
    RouterModule.register([
      {
        module: AuthModule,
        path: 'auth',
      },
      {
        module: ClientModule,
        path: 'client',
        children: [
          {
            module: UserBalancesModule,
            path: 'balance',
          },
          {
            module: UserTransactionsModule,
            path: 'transactions',
          },
        ],
      },
    ]),
  ],
})
export class RoutesModule {}
