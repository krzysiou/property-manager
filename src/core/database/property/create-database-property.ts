import { v4 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import type { PropertyModule } from '../../../app/modules/property/types.codegen';

import { dbClient } from '../db-client.js';

const createDatabaseProperty = async (property: PropertyModule.Property) => {
  const { id: propertyId, weatherData, ...rest } = property;

  const propertyExists = await dbClient.property.findFirst({
    where: { id: propertyId },
  });

  if (propertyExists) {
    throw new GraphQLError(`Property with id ${propertyId} already exists`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    });
  }

  const weatherDataId = uuid();

  await dbClient.property.create({
    data: {
      id: propertyId,
      weatherDataId,
      ...rest,
      weatherData: {
        create: {
          id: weatherDataId,
          ...weatherData,
        },
      },
    },
  });
};

export { createDatabaseProperty };
