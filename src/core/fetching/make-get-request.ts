import { httpClient } from './http-client.js';

const makeGetRequest = <T>(url: string) => httpClient.get<T>(url);

export { makeGetRequest };
