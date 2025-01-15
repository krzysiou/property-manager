import Joi from 'joi';

const argsSchema = Joi.object({
  city: Joi.string().min(3).max(20).required(),
  street: Joi.string().alphanum().min(3).max(20).required(),
  state: Joi.string().length(2).required(),
  zipCode: Joi.string()
    .length(5)
    .regex(/^[0-9]+$/)
    .required(),
});

export { argsSchema };
