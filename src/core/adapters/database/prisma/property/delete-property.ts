import type { PrismaClient } from '@prisma/client';
import type { DeleteProperty, Deps } from '../../types.js';

const initDeleteProperty = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): DeleteProperty => {
  return async ({ id: propertyId }) => {
    const property = await prismaClient.property.findFirst({
      where: { id: propertyId },
    });

    if (!property) {
      const message = `Property with id: ${propertyId} does not exist`;

      logger.error(message);
      throw errorBroker.databaseError(message);
    }

    const { weatherDataId } = property;

    try {
      await prismaClient.property.delete({
        where: { id: propertyId },
      });

      await prismaClient.weatherData.delete({
        where: { id: weatherDataId },
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw errorBroker.databaseError(error.message);
      }

      return false;
    }

    return true;
  };
};

export { initDeleteProperty };
