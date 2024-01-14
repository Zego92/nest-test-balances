// Core
import {
  Injectable,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

interface IFormatErrorsProvider {
  errors: ValidationError[];
  message: string;
}

@Injectable()
export class FormatErrorsProvider {
  public formatErrors({
    errors,
    message,
  }: IFormatErrorsProvider): UnprocessableEntityException {
    const displayErrors = errors.reduce(
      (acc, val) => ({
        ...acc,
        [val.property]: Object.values(val.constraints)[0],
      }),
      {},
    );
    throw new UnprocessableEntityException({
      message,
      errors: displayErrors,
    });
  }
}
