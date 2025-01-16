import axios from 'axios';

const httpClient = axios.create({
  headers: {
    'User-Agent': `Property-Manager ${axios.VERSION}`,
  },
});

export { httpClient };
