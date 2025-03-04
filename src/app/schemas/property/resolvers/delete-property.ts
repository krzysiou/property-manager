import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { deletePropertyActionService } from '../../../../core/services/action-handling/property/delete-property-action-service.js';

type DeleteProperty = PropertyModule.MutationResolvers['deleteProperty'];

const initDeleteProperty = (deps: Deps): DeleteProperty => {
  const { logger, errorBroker, validate, database } = deps;

  const argsSchema = Joi.object({
    id: Joi.string().uuid().required(),
  });

  const deletePropertyAction = deletePropertyActionService({
    database,
  });

  return async (_, args) => {
    const error = validate(args, argsSchema);

    if (error) {
      logger.error(error.message);
      throw errorBroker.badUserInput(error.message);
    }

    const property = await deletePropertyAction(args);

    return property;
  };
};

export { initDeleteProperty };
