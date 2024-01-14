// Core
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const { isEmail, isNotEmpty, minLength } = ERROR_MESSAGES;

export class LoginDto {
  @IsEmail({}, { message: isEmail })
  email: string;

  @IsNotEmpty({ message: () => isNotEmpty('Password') })
  @MinLength(6, { message: () => minLength('Password', 6) })
  password: string;
}
