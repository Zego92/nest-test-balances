// Core
import { IsNotEmpty } from 'class-validator';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const { isNotEmpty } = ERROR_MESSAGES;

export class CreateUserBalanceDto {
  @IsNotEmpty({ message: () => isNotEmpty('User ID') })
  userId: number;
}
