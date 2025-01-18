import type { PropertyModule } from './types.codegen.js';
import type { Deps } from '../../types.js';

import { initGetProperties } from './resolvers/get-properties.js';
import { initGetProperty } from './resolvers/get-property.js';
import { initAddProperty } from './resolvers/add-property.js';
import { initDeleteProperty } from './resolvers/delete-property.js';

type Resolvers = PropertyModule.Resolvers;

const loadSchema = (deps: Deps): { typeDefs: string; resolvers: Resolvers } => {
  const { loadFile } = deps;

  return {
    typeDefs: loadFile('src/app/schemas/property/type-defs.graphql'),
    resolvers: {
      Query: {
        getProperties: initGetProperties(deps),
        getProperty: initGetProperty(deps),
      },
      Mutation: {
        addProperty: initAddProperty(deps),
        deleteProperty: initDeleteProperty(deps),
      },
    },
  };
};

export { loadSchema };
