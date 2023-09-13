import { Socket } from "socket.io"
import { ResponseData, User, UserModel } from "../models/models"
import { logger } from "../handlers/handlers"

// disconnect
export async function disconnected() {
  console.log('Server Client Disconnected')
}

export async function login(socket: Socket, loginUser: User) {
  let response: ResponseData
  let responseMsg: string

  try {
    const { username, password } = loginUser
    const user = await UserModel.findOne({ username, password })

    if (!user) {
      responseMsg = 'Username does not exist'
      response = {
        code: 404,
        message: responseMsg
      }

      socket.emit('login', response)
      logger.warn(responseMsg, loginUser)
      return
    }

    responseMsg = 'User login'
    response = {
      code: 200,
      data: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    }

    socket.emit('login', response)
    logger.info(responseMsg, loginUser)
  } catch (error) {
    console.error(error)

    responseMsg = error as string
    response = {
      code: 500,
      message: 'Failed to log in'
    }

    socket.emit('login', response)
    logger.error('Failed to Login', { error, loginUser })
  }
}

export async function register(socket: Socket, registerUser: User) {
  let response: ResponseData
  let responseMsg: string

  try {
    const { email, password } = registerUser
    const user = await UserModel.findOne({ email, password })

    if (!user) {
      await UserModel.create(registerUser)
      responseMsg = 'User Successfully created'
      response = {
        code: 201,
        created: true,
        message: responseMsg
      }

      socket.emit('register', response)
      logger.info(responseMsg, registerUser)
      return
    }

    responseMsg = 'User already exists'
    response = {
      code: 409,
      created: false,
      message: responseMsg
    }

    socket.emit('register', response)
    logger.warn(responseMsg, registerUser)
  } catch (error) {
    console.error(error)

    responseMsg = error as string
    response = {
      code: 500,
      created: false,
      message: responseMsg
    }

    socket.emit('register', response)
    logger.error('Failed to register user', { error, registerUser })
  }
}

export async function getAlbums(socket: Socket, user: User) {
  let response: ResponseData
  let responseMsg: string

  try {
    
  } catch (error) {

  }
}

// import express, { Request, Response, NextFunction } from 'express'

// const router = express.Router()

// const success = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.send('Success')
//     next(res)
//   } catch (error) {
//     res.status(400)
//     next(error)
//   }
// }

// const doubleSend = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('double send response')

//     res.send('request 1')
//     res.send('request 2')
//     next(res)
//   } catch (err) {
//     next(err)
//   }
// }

// const broken = (req: Request, res: Response, next: NextFunction) => {
//   // console.log('broken response')
//   // Promise.resolve().then(() => { ASYNCHRONOUS
//   //   res.status(500)
//   //   throw new Error('Interval Server Error')
//   // }).catch(next)

//   try {
//     console.log('broken response')
//     throw new Error('Interval Server Error')
//   } catch (error) {
//     res.status(500)
//     next(error)
//   }
// }

// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('Not found response')
//     throw new Error('API Route not Found')
//   } catch (error) {
//     res.status(404)
//     next(error)
//   }
// }

// router.get('/', success)
// router.get('/double', doubleSend)
// router.get('/broken', broken)
// router.get('*', notFound)

// export default router