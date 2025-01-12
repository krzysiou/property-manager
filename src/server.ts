import { ApolloServer } from '@apollo/server';

import {
  typeDefs as BookSchema,
  resolvers as BookResolvers,
} from './schemas/book.js';
import {
  typeDefs as LibrarySchema,
  resolvers as LibraryResolvers,
} from './schemas/library.js';

const server = new ApolloServer({
  typeDefs: [BookSchema, LibrarySchema],
  resolvers: [BookResolvers, LibraryResolvers],
});

export { server };
