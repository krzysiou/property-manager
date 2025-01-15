import type { ResolverFunction } from '../../../types.js';
import type { Sort, State } from '../../types.js';
import type { Property } from '../types.js';

import { database } from '../../../../database/database.js';

type GetPropertiesArgs = {
  city: string;
  zipCode: string;
  state: State;
  sort: Sort;
};

const getProperties: ResolverFunction<GetPropertiesArgs, Property[]> = (
  _,
  { city, zipCode, state, sort }
) => {
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
