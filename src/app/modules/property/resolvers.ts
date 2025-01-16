import type { PropertyModule } from './types.codegen.js';

import { handleAddPropertyAction } from '../../../core/resolver-actions/property/handle-add-property-action.js';
import { handleDeletePropertyAction } from '../../../core/resolver-actions/property/handle-delete-property-action.js';
import { handleGetPropertiesAction } from '../../../core/resolver-actions/property/handle-get-properties-action.js';
import { handleGetPropertyAction } from '../../../core/resolver-actions/property/handle-get-property-action.js';
import { validateArgs } from '../../../core/validation/validate-args.js';
import {
  addPropertySchema,
  deletePropertySchema,
  getPropertiesSchema,
  getPropertySchema,
} from '../../../core/validation/property-schemas.js';

const getProperties: PropertyModule.QueryResolvers['getProperties'] = (
  _,
  args
) => {
  validateArgs(args, getPropertiesSchema);

  const properties = handleGetPropertiesAction(args);

  return properties;
};

const getProperty: PropertyModule.QueryResolvers['getProperty'] = (_, args) => {
  validateArgs(args, getPropertySchema);

  const property = handleGetPropertyAction(args);

  return property;
};

const addProperty: PropertyModule.MutationResolvers['addProperty'] = (
  _,
  args
) => {
  validateArgs(args, addPropertySchema);

  const property = handleAddPropertyAction(args);

  return property;
};

const deleteProperty: PropertyModule.MutationResolvers['deleteProperty'] = (
  _,
  args
) => {
  validateArgs(args, deletePropertySchema);

  const hasSucceded = handleDeletePropertyAction(args);

  return hasSucceded;
};

const resolvers: PropertyModule.Resolvers = {
  Query: {
    getProperties,
    getProperty,
  },
  Mutation: {
    addProperty,
    deleteProperty,
  },
};

export { resolvers };
