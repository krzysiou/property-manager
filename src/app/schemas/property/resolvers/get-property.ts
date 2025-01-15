import type { ResolverFunction } from '../../../types.js';
import type { Property } from '../types.js';

import { database } from '../../../../database/database.js';

type GetPropertyArgs = {
  id: string;
};

const getProperty: ResolverFunction<GetPropertyArgs, Property> = (_, { id }) =>
  database.find((property) => property.id === id);

export { getProperty };
