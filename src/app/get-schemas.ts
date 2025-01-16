import type { Resolvers } from './schemas/types.codegen.js';

import * as Schemas from './schemas/index.js';

type Schema = {
  typeDefs: string;
  resolvers: Resolvers;
};

const getSchemas = () => {
  const schemas: Schema[] = Object.values(Schemas);

  let typeDefsArray: string[] = [];
  let resolversArray: Resolvers[] = [];

  schemas.forEach(({ typeDefs, resolvers }) => {
    typeDefsArray = [...typeDefsArray, typeDefs];
    resolversArray = [...resolversArray, resolvers];
  });

  return {
    typeDefs: typeDefsArray,
    resolvers: resolversArray,
  };
};

export { getSchemas };
