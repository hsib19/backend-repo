import Joi from 'joi';

export const userSchema = Joi.object({
  document_id: Joi.string().required().messages({
    'string.base': 'Document ID must be a string',
    'any.required': 'Document ID is required',
  }),
  data: Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 3 characters long',
      'any.required': 'Name is required',
    }),
    country: Joi.string().required().messages({
      'string.base': 'Country must be a string',
      'any.required': 'Country is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be valid',
      'any.required': 'Email is required',
    }),
    gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
      'string.base': 'Gender must be a string',
      'any.required': 'Gender is required',
      'any.only': 'Gender must be one of Male, Female, or Other',
    }),
    username: Joi.string().min(3).required().messages({
      'string.base': 'Username must be a string',
      'string.min': 'Username must be at least 3 characters long',
      'any.required': 'Username is required',
    }),
  }).required().messages({
    'object.base': 'Data must be an object',
    'any.required': 'Data is required',
  }),
});
