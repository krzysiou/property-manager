import type { MutationDeletePropertyArgs } from '../../../app/modules/types.codegen.js';

import { database } from '../../../database/database.js';

const handleDeletePropertyAction = (args: MutationDeletePropertyArgs) => {
  const { id } = args;

  const propertyIndex = database.findIndex((property) => property.id === id);

  if (propertyIndex === -1) {
    return false;
  }

  database.splice(propertyIndex, 1);

  return true;
};

export { handleDeletePropertyAction };
