import { NextFunction, Request, Response } from 'express';
import { UniqueConstraintError, ValidationError as SqlValidationError } from 'sequelize';
import { BaseError, ValidationDetail, ValidationError } from './models';

function parseError(error: unknown): BaseError {
  let modifiedError: BaseError;
  if (error instanceof UniqueConstraintError) {
    const sqlError = error.errors[0];
    const details:ValidationDetail[] = [{
      property: sqlError.path ?? 'data',
      reason: sqlError.message,
    }];
    modifiedError = new BaseError(sqlError.message, 409, details);
  } else if (error instanceof SqlValidationError) {
    const details:ValidationDetail[] = error.errors.map((sqlError) => ({
      property: sqlError.path ?? 'data',
      reason: sqlError.message,
    }));

    modifiedError = new ValidationError('Input Invalidation Error', details);
  } else if (error instanceof BaseError) {
    modifiedError = error;
  } else {
    console.error(error);
    modifiedError = new BaseError('Something went wrong', 500);
  }

  return modifiedError;
}

function gaurd(callback: CallableFunction) {
  return async (req:Request, res:Response, next: NextFunction): Promise<void> => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(parseError(err));
    }
  };
}

export default gaurd;
