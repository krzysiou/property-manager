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

type Resolvers = PropertyModule.Resolvers;
type GetProperties = PropertyModule.QueryResolvers['getProperties'];
type GetProperty = PropertyModule.QueryResolvers['getProperty'];
type AddProperty = PropertyModule.MutationResolvers['addProperty'];
type DeleteProperty = PropertyModule.MutationResolvers['deleteProperty'];

const getProperties: GetProperties = async (_, args) => {
  validateArgs(args, getPropertiesSchema);

  const properties = await handleGetPropertiesAction(args);

  return properties;
};

const getProperty: GetProperty = async (_, args) => {
  validateArgs(args, getPropertySchema);

  const property = await handleGetPropertyAction(args);

  return property;
};

const addProperty: AddProperty = async (_, args, context) => {
  validateArgs(args, addPropertySchema);

  const property = await handleAddPropertyAction(args, context);

  return property;
};

const deleteProperty: DeleteProperty = async (_, args) => {
  validateArgs(args, deletePropertySchema);

  const hasSucceded = await handleDeletePropertyAction(args);

  return hasSucceded;
};

const resolvers: Resolvers = {
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
