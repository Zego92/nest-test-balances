// Core
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';

// Constants
import { EVENT_TYPES, TRANSACTION_TYPES } from '@/constants';

// Entities
import { UserBalanceEntity } from '@/database/entities';

// Events
import { UserTransactionCreateEvent } from '@/events';

const { userTransactionCreated } = EVENT_TYPES;
const { deposit, withdraw } = TRANSACTION_TYPES;

@Injectable()
export class UserTransactionCreateListener {
  @InjectRepository(UserBalanceEntity)
  private readonly userBalanceRepository: Repository<UserBalanceEntity>;

  @OnEvent(userTransactionCreated, { async: true })
  async handleUserTransactionCreateListener({
    payload,
  }: UserTransactionCreateEvent) {
    const { amount: storedAmount, type, userId } = payload;

    if (type === deposit) {
      await this.userBalanceRepository.update(
        { userId },
        { amount: +storedAmount },
      );
      // await this.userBalanceRepository.increment(
      //   { userId },
      //   'amount',
      //   storedAmount,
      // );
    } else if (type === withdraw) {
      await this.userBalanceRepository.update(
        { userId },
        { amount: -storedAmount },
      );
    }
  }
}
