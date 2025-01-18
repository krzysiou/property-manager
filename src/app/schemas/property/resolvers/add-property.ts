import Joi from 'joi';

import type { PropertyModule } from '../types.codegen.js';
import type { Deps } from '../../../types.js';

import { addPropertyActionService } from '../../../../core/services/action-handling/property/add-property-action-service.js';

type AddProperty = PropertyModule.MutationResolvers['addProperty'];

const initAddProperty = (deps: Deps): AddProperty => {
  const { validate, database, weather } = deps;

  const argsSchema = Joi.object({
    city: Joi.string().min(3).max(20).required(),
    street: Joi.string().min(3).max(20).required(),
    state: Joi.string().length(2).required(),
    zipCode: Joi.string()
      .length(5)
      .regex(/^[0-9]+$/)
      .required(),
  });

  const addPropertyAction = addPropertyActionService({
    database,
    weather,
  });

  return async (_, args) => {
    validate(args, argsSchema);

    const property = await addPropertyAction(args);

    return property;
  };
};

export { initAddProperty };
