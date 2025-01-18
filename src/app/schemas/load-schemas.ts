import type { Resolvers } from './types.codegen.js';
import type { Deps } from '../types.js';

import { loadSchema as loadPropertySchema } from './property/load-schema.js';

const schemaLoaders = [loadPropertySchema];

const loadSchemas = (deps: Deps) =>
  schemaLoaders.reduce<{ typeDefs: string[]; resolvers: Resolvers[] }>(
    (acc, schemaLoader) => {
      const { typeDefs, resolvers } = schemaLoader(deps);

      return {
        typeDefs: [...acc.typeDefs, typeDefs],
        resolvers: [...acc.resolvers, resolvers],
      };
    },
    { typeDefs: [], resolvers: [] }
  );

export { loadSchemas };
