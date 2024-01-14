// Core
import { IsNotEmpty, IsPositive, IsIn } from 'class-validator';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const { isIn, isNotEmpty, isPositive } = ERROR_MESSAGES;

export class UserTransactionCreateDto {
  @IsPositive({ message: () => isPositive('amount') })
  amount: number;

  @IsNotEmpty({ message: () => isNotEmpty('userId') })
  userId: number;

  @IsIn(['deposit', 'withdraw'], {
    message: () => isIn('Type', ['deposit', 'withdraw']),
  })
  type: string;
}
