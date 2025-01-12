import { books } from '../database.js';

const typeDefs = `#graphql
  type Book {
    id: Int
    title: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

export { typeDefs, resolvers };
