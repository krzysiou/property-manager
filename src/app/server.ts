import { ApolloServer } from '@apollo/server';

import {
  typeDefs as BookSchema,
  resolvers as BookResolvers,
} from '../schemas/book.js';
import {
  typeDefs as LibrarySchema,
  resolvers as LibraryResolvers,
} from '../schemas/library.js';

const getTypeDefs = () => [BookSchema, LibrarySchema];

const getResolvers = () => [BookResolvers, LibraryResolvers];

const server = new ApolloServer({
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
});

export { server };
