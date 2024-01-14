// Core
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

// Constants
import { EVENT_TYPES, RESPONSE_MESSAGES } from '@/constants';

// DTO
import { UserTransactionCreateDto } from '@/api/client/user-transactions/dto';

// Entities
import { UserTransactionEntity } from '@/database/entities';

// Events
import { UserTransactionCreateEvent } from '@/events';

const { userTransactionCreated } = EVENT_TYPES;
const { isCreated } = RESPONSE_MESSAGES;

@Injectable()
export class UserTransactionsService {
  @InjectRepository(UserTransactionEntity)
  private readonly userTransactionRepository: Repository<UserTransactionEntity>;
  @Inject(EventEmitter2)
  private readonly eventEmitter: EventEmitter2;

  async create(
    userTransactionCreateDto: UserTransactionCreateDto,
  ): Promise<{ message: string } | void> {
    const userTransaction = await this.userTransactionRepository.create(
      userTransactionCreateDto,
    );

    return this.userTransactionRepository
      .save(userTransaction)
      .then(async () => {
        const { amount, type, userId } = userTransactionCreateDto;

        const userTransactionCreateEvent = new UserTransactionCreateEvent();
        userTransactionCreateEvent.payload = {
          amount,
          type,
          userId,
        };

        await this.eventEmitter.emitAsync(
          userTransactionCreated,
          userTransactionCreateEvent,
        );
        return {
          message: isCreated('transaction'),
        };
      })
      .catch((error) => {
        throw new UnprocessableEntityException(error);
      });
  }
}
