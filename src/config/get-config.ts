import type { Config } from './types';

const { PORT, WEATHER_API_URL, WEATHER_API_KEY } = process.env;

const getConfig = (): Config => ({
  port: PORT || '3000',
  weatherApiConfig: {
    url: WEATHER_API_URL || 'https://api.weatherstack.com',
    key: WEATHER_API_KEY,
  },
});

export { getConfig };
