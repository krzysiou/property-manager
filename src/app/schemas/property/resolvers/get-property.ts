import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { getPropertyActionService } from '../../../../core/services/action-handling/property/get-property-action-service.js';

type GetProperty = PropertyModule.QueryResolvers['getProperty'];

const initGetProperty = (deps: Deps): GetProperty => {
  const { validate, database } = deps;

  const argsSchema = Joi.object({
    id: Joi.string().uuid().required(),
  });

  const getPropertyAction = getPropertyActionService({ database });

  return async (_, args) => {
    validate(args, argsSchema);

    const property = await getPropertyAction(args);

    return property;
  };
};

export { initGetProperty };
