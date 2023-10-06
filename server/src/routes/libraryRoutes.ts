import { Socket } from 'socket.io';
import { ResponseData, User, AlbumModel } from "../models/models";
import { logger, verifyTokenResponse } from "../handlers/handlers";

export async function getAlbums(socket: Socket, user: User) {
  let response: ResponseData;
  let responseMsg: string;

  try {
    const { id, token } = user;
    const verified = await verifyTokenResponse(token!);
    
    if (!verified) {
      responseMsg = 'User is no longer in session';
      response = {
        code: 401,
        data: responseMsg
      };

      socket.emit(getAlbums.name, response);
      logger.warn(responseMsg, response);
      return;
    }

    const albums = await AlbumModel.find({ userId: id });

    responseMsg = 'Get user Albums';
    response = {
      code: 200,
      data: albums
    };

    socket.emit(getAlbums.name, response);
    logger.info(responseMsg, user);
  } catch (error) {
    console.error(error);

    responseMsg = error as string;
    response = {
      code: 500,
      message: responseMsg
    };

    socket.emit(getAlbums.name,);
    logger.error('Failed to get Albums', { error, user });
  }
}