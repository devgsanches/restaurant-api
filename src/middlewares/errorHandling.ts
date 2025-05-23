import {
  Request,
  Response,
  NextFunction,
  type ErrorRequestHandler,
} from 'express'
import AppError from '@/utils/AppError.js'

export function errorHandling(
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    })
    return
  }

  res.status(500).json({
    message: error.message,
  })
  return
}
