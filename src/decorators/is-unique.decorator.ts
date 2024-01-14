// Core
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IS_EMPTY,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Typeorm
import { connectionSource } from '@/typeorm';

const { isNotEmpty, isExist } = ERROR_MESSAGES;

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  async validate(value: any, args?: ValidationArguments): Promise<any> {
    const [entityName, fieldName] = args.constraints;
    const { id }: any = args.object;

    if (!value) {
      args.constraints.push(IS_EMPTY);
      return;
    }

    const manager = connectionSource;
    if (!manager.isInitialized) await connectionSource.initialize();
    const repository = await manager.getRepository(entityName);

    const count = await repository.count({
      where: {
        [fieldName]: value,
        id: id && Not(id),
      },
    });

    return Number(count) === 0;
  }

  defaultMessage(args: ValidationArguments) {
    const [, , displayName, IS_EMPTY] = args.constraints;
    if (IS_EMPTY) {
      return isNotEmpty(displayName);
    }

    return isExist;
  }
}

export function IsUnique(
  entityName: string,
  fieldName: string,
  displayName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityName, fieldName, displayName],
      validator: UniqueValidator,
    });
  };
}
