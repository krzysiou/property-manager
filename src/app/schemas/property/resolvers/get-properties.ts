import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { getPropertiesActionService } from '../../../../core/services/action-handling/property/get-properties-action-service.js';

type GetProperties = PropertyModule.QueryResolvers['getProperties'];

const initGetProperties = (deps: Deps): GetProperties => {
  const { validate, database } = deps;

  const argsSchema = Joi.object({
    city: Joi.string().min(3).max(20),
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
    validate(args, argsSchema);

    const properties = await getPropertiesAction(args);

    return properties;
  };
};

export { initGetProperties };
