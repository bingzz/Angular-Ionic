import { Socket } from "socket.io";
import { ResponseData, User, UserModel } from "../models/models";
import { generateTokenResponse, logger } from "../handlers/handlers";

// disconnect
export async function disconnected() {
  console.log('Server Client Disconnected');
}

export async function login(socket: Socket, loginUser: User) {
  let response: ResponseData;
  let responseMsg: string;

  try {
    const { username, password } = loginUser;
    const user = await UserModel.findOne({ username, password });

    if (!user) {
      responseMsg = 'Username does not exist';
      response = {
        code: 404,
        message: responseMsg
      };

      socket.emit(login.name, response);
      logger.warn(responseMsg, loginUser);
      return;
    }

    responseMsg = 'User login';

    const token = generateTokenResponse(user.id);

    if (!token) {
      responseMsg = 'JWT key is missing';
      response = {
        code: 404,
        message: 'Server is not available at this time.'
      };

      socket.emit(login.name, response);
      logger.info(responseMsg, loginUser);
      return;
    }

    response = {
      code: 200,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        token: token
      }
    };

    socket.emit(login.name, response);
    logger.info(responseMsg, loginUser);
  } catch (error) {
    console.error(error);

    responseMsg = error as string;
    response = {
      code: 500,
      message: 'Failed to log in'
    };

    socket.emit(login.name, response);
    logger.error('Failed to Login', { error, loginUser });
  }
}

export async function register(socket: Socket, registerUser: User) {
  let response: ResponseData;
  let responseMsg: string;

  try {
    const { email, username } = registerUser;
    const user = await UserModel.find({ email: email, username: username });

    console.log(user);
    
    if (!!user.length) {
      responseMsg = 'User or Email already exists';
      response = {
        code: 409,
        created: false,
        message: responseMsg
      };

      socket.emit(register.name, response);
      logger.warn(responseMsg, registerUser);
      return;
    }

    await UserModel.create(registerUser);
    responseMsg = 'User Successfully created';
    response = {
      code: 201,
      created: true,
      message: responseMsg
    };

    socket.emit(register.name, response);
    logger.info(responseMsg, registerUser);
  } catch (error) {
    console.error(error);

    responseMsg = error as string;
    response = {
      code: 500,
      created: false,
      message: responseMsg
    };

    socket.emit(register.name, response);
    logger.error('Failed to register user', { error, registerUser });
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