import { NextFunction, Request, Response } from "express";
import { Error as SqError, UniqueConstraintError } from "sequelize";
import { BaseError, ValidationDetail } from "../api/v1/models/error_models";

function errorHandler(err:BaseError, req:Request, res: Response, next: NextFunction) {
      res.status(err.code).json(err);
  }
  
export default errorHandler;