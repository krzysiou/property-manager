import assert from 'assert';

import type { ApolloServer, BaseContext } from '@apollo/server';
import type { Property, State } from '../../src/app/schemas/types.codegen.js';

import { assumeType } from './assume-type.js';

const pupulateDatabase = async (server: ApolloServer<BaseContext>) => {
  const amount = 10;

  const ids: string[] = [];

  const cities: string[] = [
    'New York',
    'Las Vegas',
    'Kansas City',
    'Baytown',
    'Detroit',
  ];

  const streets: string[] = [
    'Angel st.',
    'Funk st.',
    'Lake st.',
    'Russel st.',
    'Laurel st.',
  ];

  const states: State[] = ['AK', 'FL', 'DE', 'UT', 'SD'];

  const zipCodes: string[] = ['12345', '54321', '12321', '54332', '12543'];

  for (let i = 0; i < amount; i++) {
    const response = await server.executeOperation({
      query: `
      mutation AddProperty($city: String!, $street: String!, $state: State!, $zipCode: String!) { 
        addProperty(city: $city, street: $street, state: $state, zipCode: $zipCode) { 
          id
        } 
      }`,
      variables: {
        city: cities[i % 5],
        street: streets[i % 5],
        state: states[i % 5],
        zipCode: zipCodes[i % 5],
      },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<Property>(
      response.body.singleResult.data?.addProperty
    );

    ids.push(data.id);
  }

  return ids;
};

export { pupulateDatabase };
