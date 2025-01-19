import type { ObjectSchema } from 'joi';

type Validate = <T>(
  objectToValidate: T,
  validationSchema: ObjectSchema
) => Error | null;

type ValidationService = () => Validate;

const validationService: ValidationService = () => {
  return (objectToValidate, validationSchema) => {
    const { error } = validationSchema.validate(objectToValidate);

    if (error) {
      return error;
    }

    return null;
  };
};

export { validationService, type ValidationService, type Validate };
