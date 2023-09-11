import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error handler')

  const statusCode = res.statusCode || 500
  const errorName = err.name || 'INTERNAL SERVER ERROR'
  const jsonObj = {
    response: 'Internal Server Error',
    error: {
      type: errorName,
      code: statusCode,
      message: err.message,
    }
  }

  res.status(statusCode).json(jsonObj)
}

export const loggingHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Log handler')
  
  if (res.statusCode !== 200) {
    next(err)
  }
}