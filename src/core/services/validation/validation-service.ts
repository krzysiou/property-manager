import type { ObjectSchema } from 'joi';

type Validate = <T>(
  objectToValidate: T,
  validationSchema: ObjectSchema
) => { data: T; error: null } | { data: null; error: Error };

type ValidationService = () => Validate;

const validationService: ValidationService = () => {
  return (objectToValidate, validationSchema) => {
    const { error } = validationSchema.validate(objectToValidate);

    if (error) {
      return { data: null, error };
    }

    return { data: objectToValidate, error: null };
  };
};

export { validationService, type ValidationService, type Validate };
