// Core
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

// Constants
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from '@/constants';

// DTO
import { CreateUserBalanceDto } from '@/api/client/user-balances/dto';

// Entities
import { UserBalanceEntity } from '@/database/entities';

const { isNotExist } = ERROR_MESSAGES;
const { isCreated } = RESPONSE_MESSAGES;

@Injectable()
export class UserBalancesService {
  @InjectRepository(UserBalanceEntity)
  private readonly userBalanceRepository: Repository<UserBalanceEntity>;

  async create(
    userBalanceDto: CreateUserBalanceDto,
  ): Promise<{ message: string } | void> {
    const userBalance = await this.userBalanceRepository.create(userBalanceDto);
    return this.userBalanceRepository
      .save(userBalance)
      .then(() => ({ message: isCreated('User Balance') }))
      .catch((error) => {
        throw new UnprocessableEntityException(error);
      });
  }

  async findOne(
    userId: UserBalanceEntity['userId'],
  ): Promise<UserBalanceEntity | void> {
    return this.userBalanceRepository
      .findOneByOrFail({ userId })
      .then((response) => response)
      .catch(() => {
        throw new NotFoundException({
          message: isNotExist('user', 'User Balances'),
        });
      });
  }
}
