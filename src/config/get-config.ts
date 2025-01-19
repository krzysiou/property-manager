import type { Config } from './types.js';

const {
  PORT = '3000',
  WEATHER_API_URL = 'https://api.weatherstack.com',
  WEATHER_API_KEY = '',
} = process.env;

const getConfig = (): Config => ({
  port: PORT,
  weatherApiConfig: {
    url: WEATHER_API_URL,
    key: WEATHER_API_KEY,
  },
});

export { getConfig };
