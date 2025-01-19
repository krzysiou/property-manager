import axios from 'axios';

import type { FetcherAdapter } from './types.js';

const fetcherAdapter: FetcherAdapter = ({ logger, errorBroker }) => ({
  makeGetRequest: async (url) => {
    try {
      return (await axios.get(url)).data;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw errorBroker.fetchingError(error.message);
      }
    }
  },
  makePostRequest: async (url, body) => {
    try {
      return (await axios.post(url, body)).data;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw errorBroker.fetchingError(error.message);
      }
    }
  },
});

export { fetcherAdapter };
