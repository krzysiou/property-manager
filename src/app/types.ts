import type { Config } from '../config/types';
import type { ErrorBroker } from '../core/adapters/error-broker/types';
import type { Logger } from '../core/adapters/logger/types';
import type { Database } from '../core/adapters/database/types.js';
import type { Fetcher } from '../core/adapters/fetcher/types.js';
import type { LoadFile } from '../core/services/file-loading/file-loading-service.js';
import type { Validate } from '../core/services/validation/validation-service.js';
import type { Weather } from '../core/adapters/weather/types.js';

type Deps = {
  config: Config;
  logger: Logger;
  errorBroker: ErrorBroker;
  fetcher: Fetcher;
  database: Database;
  validate: Validate;
  loadFile: LoadFile;
  weather: Weather;
};

export type { Deps };
