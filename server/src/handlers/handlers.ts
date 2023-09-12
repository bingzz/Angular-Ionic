import { Request, Response, NextFunction } from 'express'
import { Socket } from 'socket.io'

import winston from 'winston'

const logsFolder = './logs/'
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logsFolder + 'logFile.log', level: 'info' }),
    new winston.transports.File({ filename: logsFolder + 'warnLogs.log', level: 'warn' }),
    new winston.transports.File({ filename: logsFolder + 'errorLogs.log', level: 'error' })
  ]
})
// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.log('Error handler')

//   const statusCode = res.statusCode || 500
//   const errorName = err.name || 'INTERNAL SERVER ERROR'
//   const jsonObj = {
//     response: 'Internal Server Error',
//     error: {
//       type: errorName,
//       code: statusCode,
//       message: err.message,
//     }
//   }

//   res.status(statusCode).json(jsonObj)
// }

// export const loggingHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.log('Log handler')

//   if (res.statusCode !== 200) {
//     next(err)
//   }
// }