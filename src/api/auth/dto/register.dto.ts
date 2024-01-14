// Core
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Decorators
import { IsUnique } from '@/decorators';

const { isNotEmpty, isEmail, minLength } = ERROR_MESSAGES;

export class RegisterDto {
  @IsNotEmpty({ message: () => isNotEmpty('First Name') })
  firstName: string;

  @IsNotEmpty({ message: () => isNotEmpty('Last Name') })
  lastName: string;

  @IsEmail({}, { message: isEmail })
  @IsUnique('users', 'email', 'Email')
  email: string;

  @IsNotEmpty({ message: () => isNotEmpty('Password') })
  @MinLength(6, { message: () => minLength('Password', 6) })
  password: string;
}
