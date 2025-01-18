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
    const properties = await database.property.getProperties(args);

    return properties;
  };
};

export { getPropertiesActionService };
