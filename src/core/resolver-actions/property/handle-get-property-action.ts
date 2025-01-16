import type { QueryGetPropertyArgs } from '../../../app/modules/types.codegen.js';

import { getDatabaseProperties } from '../../database/property/get-database-properties-.js';

const handleGetPropertyAction = async (args: QueryGetPropertyArgs) => {
  const { id } = args;

  const properties = await getDatabaseProperties();

  const property = properties.find((property) => property.id === id);

  return property;
};

export { handleGetPropertyAction };
