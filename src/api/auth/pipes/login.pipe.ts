// Core
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// Constants
import { RESPONSE_MESSAGES } from '@/constants';

// DTO
import { LoginDto } from '@/api/auth/dto';

// Providers
import { FormatErrorsProvider } from '@/providers';

const { errorValidation: message } = RESPONSE_MESSAGES;

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: LoginDto, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errorsProvider = new FormatErrorsProvider();

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
