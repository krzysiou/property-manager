import type {
  Property,
  QueryGetPropertiesArgs,
} from '../../../../app/schemas/types.codegen.js';
import type { Database } from '../../../adapters/database/types.js';

type Deps = {
  database: Database;
};

type GetPropertiesAction = (
  args: QueryGetPropertiesArgs
) => Promise<Property[]>;

type GetPropertiesActionService = (deps: Deps) => GetPropertiesAction;

const getPropertiesActionService: GetPropertiesActionService = ({
  database,
}) => {
  return async (args) => {
    const { city, zipCode, state, sort } = args;

    let properties = await database.property.getProperties();

    if (city) {
      properties = properties.filter((prop) => prop.city === city);
    }

    if (zipCode) {
      properties = properties.filter((prop) => prop.zipCode === zipCode);
    }

    if (state) {
      properties = properties.filter((prop) => prop.state === state);
    }

    if (sort) {
      properties = properties.sort((a, b) =>
        sort === 'desc'
          ? new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
          : new Date(a.creationDate).getTime() -
            new Date(b.creationDate).getTime()
      );
    }

    return properties;
  };
};

export { getPropertiesActionService };
