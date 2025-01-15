import type { Resolver } from '../../../types.js';
import type { Property } from '../types.js';

import { database } from '../../../../database/database.js';
import { argsSchema } from '../validation/get-property.schema.js';
import { validateArgs } from '../../../../core/validate-args/validate-args.js';

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
