import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { getPropertyActionService } from '../../../../core/services/action-handling/property/get-property-action-service.js';

type GetProperty = PropertyModule.QueryResolvers['getProperty'];

const initGetProperty = (deps: Deps): GetProperty => {
  const { logger, errorBroker, validate, database } = deps;

  const argsSchema = Joi.object({
    id: Joi.string().uuid().required(),
  });

  const getPropertyAction = getPropertyActionService({ database });

  return async (_, args) => {
    const { data: validArgs, error } = validate(args, argsSchema);

    if (error) {
      logger.error(error.message);
      errorBroker.throwBadUserInput(error.message);
    }

    const property = await getPropertyAction(validArgs);

    return property;
  };
};

export { initGetProperty };
