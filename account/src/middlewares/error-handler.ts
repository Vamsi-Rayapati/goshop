import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../api/v1/models/error_models';

function errorHandler(err:BaseError, _req:Request, res: Response, next: NextFunction): void {
  res.status(err.code).json(err);
}

export default errorHandler;
