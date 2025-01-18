import Joi from 'joi';

const responseSchema = Joi.object({
  location: Joi.object({
    lat: Joi.string().required(),
    lon: Joi.string().required(),
  }).unknown(true),
  current: Joi.object({
    observation_time: Joi.string().required(),
    temperature: Joi.number().required(),
    weather_code: Joi.number().required(),
    wind_speed: Joi.number().required(),
    wind_degree: Joi.number().required(),
    wind_dir: Joi.string().required(),
    pressure: Joi.number().required(),
    precip: Joi.number().required(),
    humidity: Joi.number().required(),
    cloudcover: Joi.number().required(),
    feelslike: Joi.number().required(),
    uv_index: Joi.number().required(),
    visibility: Joi.number().required(),
  }).unknown(true),
}).unknown(true);

export { responseSchema };
