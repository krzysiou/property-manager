import Joi from 'joi';

const propertySchema = Joi.object({
  id: Joi.string().uuid().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  lat: Joi.string().required(),
  lon: Joi.string().required(),
  weatherData: Joi.object({
    observationTime: Joi.string().required(),
    temperature: Joi.number().required(),
    weatherCode: Joi.number().required(),
    windSpeed: Joi.number().required(),
    windDegree: Joi.number().required(),
    windDir: Joi.string().required(),
    pressure: Joi.number().required(),
    precip: Joi.number().required(),
    humidity: Joi.number().required(),
    cloudcover: Joi.number().required(),
    feelslike: Joi.number().required(),
    uvIndex: Joi.number().required(),
    visibility: Joi.number().required(),
  }).required(),
  creationDate: Joi.string().isoDate().required(),
});

export { propertySchema };
