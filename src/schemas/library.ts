import { books } from '../database.js';

const typeDefs = `#graphql
  type Library {
    name: String
    books: [Book]
  }

  type Query {
    library: Library
  }
`;

const resolvers = {
  Query: {
    library: () => ({
      name: 'Grand Library',
      books,
    }),
  },
};

export { typeDefs, resolvers };
