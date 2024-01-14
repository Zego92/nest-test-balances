// Core
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// Constants
import {
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  TRANSACTION_TYPES,
} from '@/constants';

// DTO
import { UserTransactionCreateDto } from '@/api/client/user-transactions/dto';

// Entities
import { UserBalanceEntity, UserEntity } from '@/database/entities';

// Providers
import { FormatErrorsProvider } from '@/providers';

const { errorValidation: message } = RESPONSE_MESSAGES;
const { isNotExist } = ERROR_MESSAGES;
const { withdraw } = TRANSACTION_TYPES;

@Injectable()
export class UserTransactionCreatePipe implements PipeTransform {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  @InjectRepository(UserBalanceEntity)
  private readonly userBalanceRepository: Repository<UserBalanceEntity>;

  async transform(value: UserTransactionCreateDto, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const { amount, type, userId } = value;
    const errorsProvider = new FormatErrorsProvider();

    const isExist = await this.userRepository.exists({
      where: { id: +userId },
    });
    if (!isExist) {
      throw new NotFoundException({ message: isNotExist('userId', 'Users') });
    }

    const balance = await this.userBalanceRepository.findOneBy({ userId });

    if (type === withdraw && amount > balance.amount) {
      throw new BadRequestException({
        message:
          'Withdrawal rejected. Your main balance is lower than the amount you want to withdraw',
      });
    }

    const object = plainToInstance(metatype, value);

    if (object) {
      const errors = await validate(object);

      if (errors.length > 0) {
        return errorsProvider.formatErrors({
          errors,
          message,
        });
      }
    }

    return value;
  }
}
