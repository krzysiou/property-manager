import Joi from 'joi';

const argsSchema = Joi.object({
  city: Joi.string().min(3).max(20),
  state: Joi.string().length(2),
  zipCode: Joi.string()
    .length(5)
    .regex(/^[0-9]+$/),
  sort: Joi.string().valid('asc', 'desc'),
});

export { argsSchema };
