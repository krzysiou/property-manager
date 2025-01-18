import type { MutationDeletePropertyArgs } from '../../../../app/schemas/types.codegen.js';
import type { Database } from '../../../adapters/database/types.js';

type Deps = {
  database: Database;
};

type DeletePropertyAction = (
  args: MutationDeletePropertyArgs
) => Promise<boolean>;

type DeletePropertyActionService = (deps: Deps) => DeletePropertyAction;

const deletePropertyActionService: DeletePropertyActionService = ({
  database,
}) => {
  return async (args) => {
    const { id } = args;

    const hasSucceeded = await database.property.deleteProperty(id);

    return hasSucceeded;
  };
};

export { deletePropertyActionService };
