import Joi from 'joi';

const addPropertySchema = Joi.object({
  city: Joi.string().min(3).max(20).required(),
  street: Joi.string().alphanum().min(3).max(20).required(),
  state: Joi.string().length(2).required(),
  zipCode: Joi.string()
    .length(5)
    .regex(/^[0-9]+$/)
    .required(),
});

const deletePropertySchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const getPropertiesSchema = Joi.object({
  city: Joi.string().min(3).max(20),
  state: Joi.string().length(2),
  zipCode: Joi.string()
    .length(5)
    .regex(/^[0-9]+$/),
  sort: Joi.string().valid('asc', 'desc'),
});

const getPropertySchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export {
  addPropertySchema,
  deletePropertySchema,
  getPropertiesSchema,
  getPropertySchema,
};
