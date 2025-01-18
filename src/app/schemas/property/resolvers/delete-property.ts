import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { deletePropertyActionService } from '../../../../core/services/action-handling/property/delete-property-action-service.js';

type DeleteProperty = PropertyModule.MutationResolvers['deleteProperty'];

const initDeleteProperty = (deps: Deps): DeleteProperty => {
  const { validate, database } = deps;

  const argsSchema = Joi.object({
    id: Joi.string().uuid().required(),
  });

  const deletePropertyAction = deletePropertyActionService({
    database,
  });

  return async (_, args) => {
    validate(args, argsSchema);

    const property = await deletePropertyAction(args);

    return property;
  };
};

export { initDeleteProperty };
