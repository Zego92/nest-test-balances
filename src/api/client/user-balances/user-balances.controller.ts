// Core
import { Controller, Get, Inject, Param } from '@nestjs/common';

// Entities
import { UserBalanceEntity } from '@/database/entities';

// Services
import { UserBalancesService } from './user-balances.service';

@Controller()
export class UserBalancesController {
  @Inject(UserBalancesService)
  private readonly userBalancesService: UserBalancesService;

  @Get(':id')
  findOne(@Param('id') id: UserBalanceEntity['userId']) {
    return this.userBalancesService.findOne(+id);
  }
}
