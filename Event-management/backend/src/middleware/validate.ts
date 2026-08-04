import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from './auth';

export const validate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
    return;
  }
  next();
};
