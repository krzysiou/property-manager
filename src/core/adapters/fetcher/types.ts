import type { ErrorBroker } from '../error-broker/types';
import type { Logger } from '../logger/types.js';

type Deps = {
  logger: Logger;
  errorBroker: ErrorBroker;
};

type Fetcher = {
  makeGetRequest: <T>(url: string) => Promise<T>;
  makePostRequest: <T>(url: string, body: object) => Promise<T>;
};

type FetcherAdapter = (deps: Deps) => Fetcher;

export type { FetcherAdapter, Fetcher };
