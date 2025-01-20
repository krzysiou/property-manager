import type { ApolloServer, BaseContext } from '@apollo/server';

const pruneDatabase = async (
  mockIds: string[],
  server: ApolloServer<BaseContext>
) => {
  await Promise.all(
    mockIds.map(async (mockId) => {
      await server.executeOperation({
        query: `
        mutation DeleteProperty($deletePropertyId: ID!) { 
          deleteProperty(id: $deletePropertyId) 
      }`,
        variables: { deletePropertyId: mockId },
      });
    })
  );
};

export { pruneDatabase };
