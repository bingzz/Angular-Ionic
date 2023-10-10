import { Socket } from 'socket.io';
import { ResponseData, User, AlbumModel, Album } from "../models/models";
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

    socket.emit(getAlbums.name);
    logger.error('Failed to get Albums', { error, user });
  }
}

export async function addAlbum(socket: Socket, album: Album, user: User) {
  let response: ResponseData;
  let responseMsg: string;

  try {
    const { id, token } = user;
    const { albumName, img } = album;
    const verified = await verifyTokenResponse(token!);

    if (!verified) {
      responseMsg = 'User is no longer in session';
      response = {
        code: 401,
        data: responseMsg
      };

      socket.emit(addAlbum.name, response);
      logger.warn(responseMsg, response);
      return;
    }
    
    const newAlbum: Album = { userId: id, albumName, img };

    const albums = await AlbumModel.find(newAlbum);

    if (albums.length) {
      responseMsg = 'Album already exists.';
      response = {
        code: 409,
        message: responseMsg
      };

      socket.emit(addAlbum.name, response);
      logger.warn(responseMsg, response);
      return;
    }

    await AlbumModel.create(newAlbum);

    responseMsg = 'Album successfully Added';
    response = {
      code: 201,
      created: true,
      message: responseMsg
    };

    socket.emit(addAlbum.name, response);
    logger.info(responseMsg, newAlbum);
  } catch (error) {
    console.error(error);

    responseMsg = error as string;
    response = {
      code: 500,
      message: responseMsg
    };

    socket.emit(addAlbum.name);
    logger.error('Failed to add Album', { error, user });
  }
}