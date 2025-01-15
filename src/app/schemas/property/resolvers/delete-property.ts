import Joi from 'joi';

import type { Resolver } from '../../../types.js';

import { database } from '../../../../database/database.js';
import { validateArgs } from '../../../../core/validation/validate-args.js';

const argsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

type DeletePropertyArgs = {
  id: string;
};

const deleteProperty: Resolver<DeletePropertyArgs, boolean> = (_, args) => {
  validateArgs(args, argsSchema);

  const { id } = args;

  const propertyIndex = database.findIndex((property) => property.id === id);

  if (propertyIndex === -1) {
    return false;
  }

  database.splice(propertyIndex, 1);

  return true;
};

export { deleteProperty };
