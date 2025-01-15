import type { Schema } from './types';

const parseSchemas = (schemas: Schema[]) => {
  let typeDefsArray = [];
  let resolversArray = [];

  schemas.forEach(({ typeDefs, resolvers }) => {
    typeDefsArray = [...typeDefsArray, typeDefs];
    resolversArray = [...resolversArray, resolvers];
  });

  return { typeDefs: typeDefsArray, resolvers: resolversArray };
};

export { parseSchemas };
