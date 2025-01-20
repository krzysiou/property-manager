import type {
  MutationDeletePropertyArgs,
  Property,
  QueryGetPropertiesArgs,
  QueryGetPropertyArgs,
} from '../../../app/schemas/types.codegen.js';
import type { ErrorBroker } from '../error-broker/types.js';
import type { Logger } from '../logger/types.js';
import type { Config } from '../../../config/types.js';

type Deps = {
  config: Config;
  logger: Logger;
  errorBroker: ErrorBroker;
};

type GetProperties = (args: QueryGetPropertiesArgs) => Promise<Property[]>;
type GetProperty = (args: QueryGetPropertyArgs) => Promise<Property | null>;
type CreateProperty = (property: Property) => Promise<void>;
type DeleteProperty = (args: MutationDeletePropertyArgs) => Promise<boolean>;
type Purge = () => Promise<void>;

type Database = {
  purge: Purge;
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
  Purge,
  GetProperties,
  GetProperty,
  CreateProperty,
  DeleteProperty,
};
