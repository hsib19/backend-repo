import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../models/userSchema';

export const validateUser = (req: Request, res: Response, next: NextFunction): any => {
  // Validate the request body using Joi
  const { error } = userSchema.validate(req.body);

  // If there are validation errors
  if (error) {
    return res.status(400).json({
      message: "Update data failed",
      errors: error.details.map(detail => detail.message),
    });
  }

    // Next step
  return next();
  
};
