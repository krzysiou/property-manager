import type { MutationDeletePropertyArgs } from '../../../app/schemas/types.codegen.js';

import { deleteDatabaseProperty } from '../../database/property/delete-database-property.ts.js';

const handleDeletePropertyAction = async (args: MutationDeletePropertyArgs) => {
  const { id } = args;

  const hasSucceeded = await deleteDatabaseProperty(id);

  return hasSucceeded;
};

export { handleDeletePropertyAction };
