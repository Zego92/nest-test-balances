export const ERROR_MESSAGES = {
  isEmail: 'Email is not valid',
  isExist: 'The record is already exist',
  isNotEmpty: (key: string): string => `${key} should not be empty`,
  isNotExist: (fieldName: string, entityName: string): string =>
    `This ${fieldName} in ${entityName} is not exist`,
  isPhoneNumber: 'Phone must have a next format: 380999999999',
  isUnique: (key: string): string =>
    `The record with this ${key} already exists.`,
  minLength: (key: string, length: number): string =>
    `The ${key} must be more than ${length} characters`,
  isPositive: (key: string) => `The ${key} should be a positive number`,
  isIn: (key: string, values: string[]) =>
    `${key} must be either ${values.map((value) => value).join(' or ')}`,
};

export const RESPONSE_MESSAGES = {
  errorValidation: 'The given data was invalid',
  isCreated: (key: string) => `The new ${key} created successfully`,
};
