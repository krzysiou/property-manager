import type { Resolver } from '../../../types.js';

import { database } from '../../../../database/database.js';
import { validateArgs } from '../../../../core/validate-args/validate-args.js';
import { argsSchema } from '../validation/delete-property.schema.js';

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
