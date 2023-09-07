import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

const success = (req: Request, res: Response, next: NextFunction) => {
  console.log('Success response')

  res.send('Success')
  next('Success')
}

const doubleSend = (req: Request, res: Response, next: NextFunction) => {
  console.log('double send response')

  res.send('request 1')
  res.send('request 2')
  next('success')
}

const broken = (req: Request, res: Response, next: NextFunction) => {
  console.log('broken response')
  res.status(500)
  throw new Error('Interval Server Error')
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  console.log('Not found response')

  res.status(404)
  throw new Error('API Route not Found')
}

router.get('/', success)
router.get('/double', doubleSend)
router.get('/broken', broken)
router.get('*', notFound)

export default router