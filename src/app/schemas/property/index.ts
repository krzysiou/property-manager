import { loadFile } from '../../../core/file-loader/load-file.js';
import { resolvers } from './resolvers.js';

const typeDefs = loadFile('src/app/schemas/property/type-defs.graphql');

export default { typeDefs, resolvers };
