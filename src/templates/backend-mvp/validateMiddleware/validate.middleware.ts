import { Request, Response, NextFunction } from "express";

type Validator = (body: unknown) => string | null;

/**
 * Simple body validation middleware factory.
 * Pass a validator function that returns an error message string or null.
 */
export function validate(validator: Validator) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const error = validator(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error });
      return;
    }
    next();
  };
}
