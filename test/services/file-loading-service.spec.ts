import { afterEach } from 'node:test';
import { readFileSync } from 'node:fs';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import type { LoadFile } from '../../src/core/services/file-loading/file-loading-service.js';
import type { ErrorBroker } from '../../src/core/adapters/error-broker/types.js';
import type { Logger } from '../../src/core/adapters/logger/types.js';

import { fileLoadingService } from '../../src/core/services/file-loading/file-loading-service.js';

vi.mock('node:fs');

describe('services/file-loading-service', () => {
  let loadFile: LoadFile;

  let errorBroker: ErrorBroker;
  let logger: Logger;

  beforeAll(() => {
    errorBroker = {
      badUserInput: vi.fn(),
      internalServerError: vi.fn(),
      databaseError: vi.fn(),
      fetchingError: vi.fn(),
      validationError: vi.fn(),
    };

    logger = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    loadFile = fileLoadingService({ logger, errorBroker });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns contents of a file when file exists', async () => {
    const mockFilename = 'mock-file.graphql';
    const mockContent = 'mock-content';

    vi.mocked(readFileSync).mockReturnValue(mockContent);

    const fileContent = loadFile(mockFilename);

    expect(fileContent).toEqual(mockContent);
  });

  it('throws an error when file does not exist', async () => {
    const mockFilename = 'mock-file.graphql';

    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error('file-not-found');
    });

    expect(() => loadFile(mockFilename)).toThrowError();
    expect(errorBroker.internalServerError).toBeCalled();
    expect(logger.error).toBeCalledWith(`Could not open ${mockFilename} file`);
  });
});
