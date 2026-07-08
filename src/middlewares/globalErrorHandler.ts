import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../utils/appError';

// 2. Global Error Handler Middleware
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something Went Wronng';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errDetails: err.errors || null,
  });
};
