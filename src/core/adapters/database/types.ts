import type {
  MutationDeletePropertyArgs,
  Property,
  QueryGetPropertiesArgs,
  QueryGetPropertyArgs,
} from '../../../app/schemas/types.codegen.js';
import type { ErrorBroker } from '../error-broker/types.js';
import type { Logger } from '../logger/types.js';

type Deps = {
  logger: Logger;
  errorBroker: ErrorBroker;
};

type GetProperties = (args: QueryGetPropertiesArgs) => Promise<Property[]>;
type GetProperty = (args: QueryGetPropertyArgs) => Promise<Property>;
type CreateProperty = (property: Property) => Promise<void>;
type DeleteProperty = (args: MutationDeletePropertyArgs) => Promise<boolean>;

type Database = {
  property: {
    getProperties: GetProperties;
    getProperty: GetProperty;
    createProperty: CreateProperty;
    deleteProperty: DeleteProperty;
  };
};

type DatabaseAdapter = (deps: Deps) => Database;

export type {
  DatabaseAdapter,
  Database,
  Deps,
  GetProperties,
  GetProperty,
  CreateProperty,
  DeleteProperty,
};
