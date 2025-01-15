import Joi from 'joi';

const argsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { argsSchema };
