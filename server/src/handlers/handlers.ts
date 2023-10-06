import winston from 'winston';
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config()

const logsFolder = './logs/';
const { JWTPRIVKEY, JWTTOKENEXPIRY } = process.env;

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
});

export function generateTokenResponse(id: string) {
  if (!JWTPRIVKEY || !JWTTOKENEXPIRY) return null;

  const token = jwt.sign({
    id: id
  }, JWTPRIVKEY, {
    expiresIn: JWTTOKENEXPIRY
  });

  return token;
}

export async function verifyTokenResponse(token: string) {
  if (!JWTPRIVKEY) return null;

  const decoded = await jwt.verify(token, JWTPRIVKEY) as JwtPayload;
  const expiry = decoded.exp!;
  const currentTime = Math.floor(Date.now() / 1000);
  
  return (expiry > currentTime);
}

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