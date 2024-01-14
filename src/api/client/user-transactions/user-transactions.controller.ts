// Core
import { Controller, Post, Body, Inject, UsePipes } from '@nestjs/common';

// DTO
import { UserTransactionCreateDto } from '@/api/client/user-transactions/dto';

// Pipes
import { UserTransactionCreatePipe } from '@/api/client/user-transactions/pipes';

// Services
import { UserTransactionsService } from './user-transactions.service';

@Controller()
export class UserTransactionsController {
  @Inject(UserTransactionsService)
  private readonly userTransactionsService: UserTransactionsService;

  @Post()
  @UsePipes(UserTransactionCreatePipe)
  async create(@Body() userTransactionCreateDto: UserTransactionCreateDto) {
    return this.userTransactionsService.create(userTransactionCreateDto);
  }
}
