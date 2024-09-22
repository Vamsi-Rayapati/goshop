import { NextFunction, Request, Response } from 'express';
import { UniqueConstraintError, ValidationError as SqlValidationError } from 'sequelize';
import { BaseError, ValidationDetail, ValidationError } from '../api/v1/models/error_models';

function handleError(error: unknown, next:NextFunction): void {
  try {
    if (error instanceof UniqueConstraintError) {
      const sqlError = error.errors[0];
      const details:ValidationDetail[] = [{
        property: sqlError.path ?? 'data',
        reason: sqlError.message,
      }];
      throw new BaseError(sqlError.message, 409, details);
    } else if (error instanceof SqlValidationError) {
      const details:ValidationDetail[] = error.errors.map((sqlError) => ({
        property: sqlError.path ?? 'data',
        reason: sqlError.message,
      }));

      throw new ValidationError('Input Invalidation Error', details);
    } else if(error instanceof BaseError) {
      throw error;
    }
    else {
      throw new BaseError('Something went wrong', 500);
    }
  } catch (err) {
    console.log('Gaurd',err);
    next(err);
  }
}

function gaurd(callback: CallableFunction) {
  return async (req:Request, res:Response, next: NextFunction): Promise<void> => {
    try {
      await callback(req, res, next);
    } catch (err) {
      handleError(err, next);
    }
  };
}

export default gaurd;
