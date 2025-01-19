import type {
  Property,
  QueryGetPropertyArgs,
} from '../../../../app/schemas/types.codegen.js';
import type { Database } from '../../../adapters/database/types.js';

type Deps = {
  database: Database;
};

type GetPropertyAction = (
  args: QueryGetPropertyArgs
) => Promise<Property | null>;

type GetPropertyActionService = (deps: Deps) => GetPropertyAction;

const getPropertyActionService: GetPropertyActionService = ({ database }) => {
  return async (args) => {
    const property = await database.property.getProperty(args);

    return property;
  };
};

export { getPropertyActionService };
