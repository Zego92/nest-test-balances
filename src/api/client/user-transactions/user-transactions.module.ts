// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UserTransactionsController } from './user-transactions.controller';

// Entities
import {
  UserEntity,
  UserBalanceEntity,
  UserTransactionEntity,
} from '@/database/entities';

// Listeners
import { UserTransactionCreateListener } from '@/listeners';

// Services
import { UserTransactionsService } from './user-transactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserTransactionEntity,
      UserBalanceEntity,
    ]),
  ],
  controllers: [UserTransactionsController],
  providers: [UserTransactionsService, UserTransactionCreateListener],
})
export class UserTransactionsModule {}
