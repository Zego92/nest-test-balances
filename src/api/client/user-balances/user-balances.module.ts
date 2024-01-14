// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UserBalancesController } from './user-balances.controller';

// Entities
import { UserBalanceEntity } from '@/database/entities';

// Services
import { UserBalancesService } from './user-balances.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBalanceEntity])],
  controllers: [UserBalancesController],
  providers: [UserBalancesService],
  exports: [UserBalancesService],
})
export class UserBalancesModule {}
