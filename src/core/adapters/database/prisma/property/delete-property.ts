import type { PrismaClient } from '@prisma/client';
import type { DeleteProperty, Deps } from '../../types.js';

const initDeleteProperty = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): DeleteProperty => {
  return async (id: string) => {
    try {
      await prismaClient.property.delete({
        where: {
          id,
        },
      });

      return true;
    } catch {
      const message = `Property with id: ${id} does not exist`;

      logger.error(message);
      errorBroker.throwDatabaseError(message);
    }
  };
};

export { initDeleteProperty };
