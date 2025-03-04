import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { ErrorBroker } from '../../adapters/error-broker/types.js';
import type { Logger } from '../../adapters/logger/types.js';

type Deps = {
  logger: Logger;
  errorBroker: ErrorBroker;
};

type LoadFile = (filePath: string) => string;

type FileLoadingService = (deps: Deps) => LoadFile;

const fileLoadingService: FileLoadingService = ({ logger, errorBroker }) => {
  return (filePath) => {
    try {
      return readFileSync(resolve(filePath), { encoding: 'utf-8' });
    } catch {
      const message = `Could not open ${filePath} file`;

      logger.error(message);
      throw errorBroker.internalServerError(message);
    }
  };
};

export { fileLoadingService, type FileLoadingService, type LoadFile };
