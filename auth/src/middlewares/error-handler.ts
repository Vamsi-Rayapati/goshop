import { Request, Response } from 'express';
import { BaseError } from '../api/v1/models/error_models';

function errorHandler(err:BaseError, _req:Request, res: Response): void {
  console.error('VRRR',err);
  res.status(err.code).json(err);
}

export default errorHandler;
