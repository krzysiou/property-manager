import Joi from 'joi';

import type { Resolver } from '../../../types.js';
import type { Property } from '../types.js';

import { database } from '../../../../database/database.js';
import { validateArgs } from '../../../../core/validation/validate-args.js';

const argsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

type GetPropertyArgs = {
  id: string;
};

const getProperty: Resolver<GetPropertyArgs, Property> = (_, args) => {
  validateArgs(args, argsSchema);

  const { id } = args;

  const property = database.find((property) => property.id === id);

  return property;
};

export { getProperty };
