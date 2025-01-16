import type { QueryGetPropertiesArgs } from '../../../app/modules/types.codegen.js';

import { database } from '../../../database/database.js';

const handleGetPropertiesAction = (args: QueryGetPropertiesArgs) => {
  const { city, zipCode, state, sort } = args;

  let filteredProperties = database;

  if (city) {
    filteredProperties = database.filter((prop) => prop.city === city);
  }

  if (zipCode) {
    filteredProperties = filteredProperties.filter(
      (prop) => prop.zipCode === zipCode
    );
  }

  if (state) {
    filteredProperties = filteredProperties.filter(
      (prop) => prop.state === state
    );
  }

  if (sort) {
    filteredProperties = filteredProperties.sort((a, b) =>
      sort === 'desc'
        ? new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
        : new Date(a.creationDate).getTime() -
          new Date(b.creationDate).getTime()
    );
  }

  return filteredProperties;
};

export { handleGetPropertiesAction };
