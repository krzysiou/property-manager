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
    const error = validate(args, argsSchema);

    if (error) {
      logger.error(error.message);
      throw errorBroker.badUserInput(error.message);
    }

    const property = await getPropertyAction(args);

    return property;
  };
};

export { initGetProperty };
