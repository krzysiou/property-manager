import type { Schema } from './types';

import * as schemasModule from './schemas/index.js';

const getSchemas = () => {
  const schemas: Schema[] = Object.values(schemasModule);

  let typeDefsArray = [];
  let resolversArray = [];

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
