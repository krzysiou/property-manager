import type { QueryGetPropertiesArgs } from '../../../app/modules/types.codegen.js';

import { getDatabaseProperties } from '../../database/property/get-database-properties-.js';

const handleGetPropertiesAction = async (args: QueryGetPropertiesArgs) => {
  const { city, zipCode, state, sort } = args;

  let properties = await getDatabaseProperties();

  if (city) {
    properties = properties.filter((prop) => prop.city === city);
  }

  if (zipCode) {
    properties = properties.filter((prop) => prop.zipCode === zipCode);
  }

  if (state) {
    properties = properties.filter((prop) => prop.state === state);
  }

  if (sort) {
    properties = properties.sort((a, b) =>
      sort === 'desc'
        ? new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
        : new Date(a.creationDate).getTime() -
          new Date(b.creationDate).getTime()
    );
  }

  return properties;
};

export { handleGetPropertiesAction };
