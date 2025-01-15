import type { Resolver } from '../../../types.js';
import type { Property, Sort, State } from '../types.js';

import { database } from '../../../../database/database.js';
import { argsSchema } from '../validation/get-properties.schema.js';
import { validateArgs } from '../../../../core/validate-args/validate-args.js';

type GetPropertiesArgs = {
  city: string;
  zipCode: string;
  state: State;
  sort: Sort;
};

const getProperties: Resolver<GetPropertiesArgs, Property[]> = (_, args) => {
  validateArgs(args, argsSchema);

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

export { getProperties };
