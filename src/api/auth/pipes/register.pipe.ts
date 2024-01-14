// Core
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// Constants
import { RESPONSE_MESSAGES } from '@/constants';

// DTO
import { RegisterDto } from '@/api/auth/dto';

// Providers
import { FormatErrorsProvider } from '@/providers';

const { errorValidation: message } = RESPONSE_MESSAGES;

@Injectable()
export class RegisterPipe implements PipeTransform {
  async transform(value: RegisterDto, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const errorsProvider = new FormatErrorsProvider();

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
