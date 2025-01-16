import type { Resolvers } from './modules/types.codegen.js';

import * as Modules from './modules/index.js';

type Module = {
  typeDefs: string;
  resolvers: Resolvers;
};

const getModules = () => {
  const modules: Module[] = Object.values(Modules);

  let typeDefsArray: string[] = [];
  let resolversArray: Resolvers[] = [];

  modules.forEach(({ typeDefs, resolvers }) => {
    typeDefsArray = [...typeDefsArray, typeDefs];
    resolversArray = [...resolversArray, resolvers];
  });

  return {
    typeDefs: typeDefsArray,
    resolvers: resolversArray,
  };
};

export { getModules };
