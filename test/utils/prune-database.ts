import type { ApolloServer, BaseContext } from '@apollo/server';

const pruneDatabase = async (
  ids: string[],
  server: ApolloServer<BaseContext>
) => {
  await Promise.all(
    ids.map(async (id) => {
      await server.executeOperation({
        query: `
      mutation DeleteProperty($deletePropertyId: ID!) { 
        deleteProperty(id: $deletePropertyId) 
      }`,
        variables: { deletePropertyId: id },
      });
    })
  );
};

export { pruneDatabase };
