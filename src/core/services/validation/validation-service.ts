import type { ObjectSchema } from 'joi';
import type { ErrorBroker } from '../../adapters/error-broker/types.js';
import type { Logger } from '../../adapters/logger/types.js';

type Deps = {
  logger: Logger;
  errorBroker: ErrorBroker;
};

type Validate = (
  objectToValidate: object,
  validationSchema: ObjectSchema
) => void;

type ValidationService = (deps: Deps) => Validate;

const validationService: ValidationService = ({ logger, errorBroker }) => {
  return (objectToValidate, validationSchema) => {
    const { error } = validationSchema.validate(objectToValidate);

    if (error) {
      logger.error(error.message);
      errorBroker.throwBadUserInput(error.message);
    }
  };
};

export { validationService, type ValidationService, type Validate };
