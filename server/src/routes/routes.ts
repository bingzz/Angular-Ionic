import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

const success = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Success')
    next(res)
  } catch (error) {
    res.status(400)
    next(error)
  }
}

const doubleSend = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('double send response')

    res.send('request 1')
    res.send('request 2')
    next(res)
  } catch (err) {
    next(err)
  }
}

const broken = (req: Request, res: Response, next: NextFunction) => {
  // console.log('broken response')
  // Promise.resolve().then(() => { ASYNCHRONOUS 
  //   res.status(500)
  //   throw new Error('Interval Server Error')
  // }).catch(next)

  try {
    console.log('broken response')
    throw new Error('Interval Server Error')
  } catch (error) {
    res.status(500)
    next(error)
  }
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Not found response')
    throw new Error('API Route not Found')
  } catch (error) {
    res.status(404)
    next(error)
  }
}

router.get('/', success)
router.get('/double', doubleSend)
router.get('/broken', broken)
router.get('*', notFound)

export default router