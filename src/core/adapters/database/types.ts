import type { Property } from '../../../app/schemas/types.codegen';
import type { ErrorBroker } from '../error-broker/types';
import type { Logger } from '../logger/types.js';

type Deps = {
  logger: Logger;
  errorBroker: ErrorBroker;
};

type CreateProperty = (property: Property) => Promise<void>;
type GetProperties = (limit: number, offset: number) => Promise<Property[]>;
type DeleteProperty = (id: string) => Promise<boolean>;

type Database = {
  property: {
    createProperty: CreateProperty;
    getProperties: GetProperties;
    deleteProperty: DeleteProperty;
  };
};

type DatabaseAdapter = (deps: Deps) => Database;

export type {
  DatabaseAdapter,
  Database,
  Deps,
  CreateProperty,
  GetProperties,
  DeleteProperty,
};
