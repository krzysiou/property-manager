import type { Config, Env } from './types.js';

const {
  PORT = '3000',
  ENV = 'dev',
  WEATHER_API_URL = 'https://api.weatherstack.com',
  WEATHER_API_KEY = '',
} = process.env;

const getConfig = (): Config => ({
  port: PORT,
  env: ENV as Env,
  weatherApiConfig: {
    url: WEATHER_API_URL,
    key: WEATHER_API_KEY,
  },
});

export { getConfig };
