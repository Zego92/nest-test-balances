// Core
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// Controllers
import { UserBalancesController } from '@/api/client/user-balances';
import { UserTransactionsController } from '@/api/client/user-transactions';

// Middlewares
import { AuthMiddleware } from '@/middlewares';

// Modules
import { UserBalancesModule } from '@/api/client/user-balances';
import { UserTransactionsModule } from '@/api/client/user-transactions';

@Module({
  imports: [UserTransactionsModule, UserBalancesModule],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(UserBalancesController);
    consumer.apply(AuthMiddleware).forRoutes(UserTransactionsController);
  }
}
