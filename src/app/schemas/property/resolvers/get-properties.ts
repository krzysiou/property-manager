import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { getPropertiesActionService } from '../../../../core/services/action-handling/property/get-properties-action-service.js';

type GetProperties = PropertyModule.QueryResolvers['getProperties'];

const initGetProperties = (deps: Deps): GetProperties => {
  const { logger, errorBroker, validate, database } = deps;

  const argsSchema = Joi.object({
    city: Joi.string().min(3).max(40),
    state: Joi.string().length(2),
    zipCode: Joi.string()
      .length(5)
      .regex(/^[0-9]+$/),
    sort: Joi.string().valid('asc', 'desc'),
    limit: Joi.number(),
    offset: Joi.number(),
  });

  const getPropertiesAction = getPropertiesActionService({
    database,
  });

  return async (_, args) => {
    const defaultArgs = { limit: 10, offset: 0, ...args };

    const { data: validArgs, error } = validate(defaultArgs, argsSchema);

    if (error) {
      logger.error(error.message);
      errorBroker.throwBadUserInput(error.message);
    }

    const properties = await getPropertiesAction(validArgs);

    return {
      properties,
      metadata: {
        limit: defaultArgs.limit,
        offset: defaultArgs.offset,
      },
    };
  };
};

export { initGetProperties };
