import type { Resolvers } from './types.codegen.js';
import type { Deps } from '../types.js';

import { loadSchema as loadPropertySchema } from './property/load-schema.js';

const schemaLoaders = [loadPropertySchema];

const loadSchemas = (deps: Deps) =>
  schemaLoaders.reduce<{ typeDefs: string[]; resolvers: Resolvers[] }>(
    (acc, schemaLoader) => {
      return {
        typeDefs: [...acc.typeDefs, schemaLoader(deps).typeDefs],
        resolvers: [...acc.resolvers, schemaLoader(deps).resolvers],
      };
    },
    { typeDefs: [], resolvers: [] }
  );

export { loadSchemas };
