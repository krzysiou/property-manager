import type { QueryGetPropertyArgs } from '../../../app/modules/types.codegen.js';

import { database } from '../../../database/database.js';

const handleGetPropertyAction = (args: QueryGetPropertyArgs) => {
  const { id } = args;

  const property = database.find((property) => property.id === id);

  return property;
};

export { handleGetPropertyAction };
