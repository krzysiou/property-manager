import type {
  Property,
  QueryGetPropertyArgs,
} from '../../../../app/schemas/types.codegen.js';
import type { Database } from '../../../adapters/database/types.js';

type Deps = {
  database: Database;
};

type GetPropertyAction = (args: QueryGetPropertyArgs) => Promise<Property>;

type GetPropertyActionService = (deps: Deps) => GetPropertyAction;

const getPropertyActionService: GetPropertyActionService = ({ database }) => {
  return async (args) => {
    const { id } = args;

    const properties = await database.property.getProperties();

    const property = properties.find((property) => property.id === id);

    return property;
  };
};

export { getPropertyActionService };
