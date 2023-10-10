import { Socket } from "socket.io";
import { ResponseData } from "../models/models";

import * as library from './library.routes';
import * as user from './user.routes';

const requestDelay = 1500;
let response: ResponseData;

async function socketEvents(socket: Socket) {
  console.log('Server Client Connected', socket.id);

  socket.use((packet, next) => {
    console.log('Middleware executed');

    const event = packet[0];
    const request = packet[1];

    console.log('Event:', event, '\nRequest:', request);

    setTimeout(() => {
      if (packet.length === 1) {
        response = {
          message: 'Insufficient Data provided',
          code: 400
        };

        socket.emit(event, response);
        return;
      }

      next();
    }, requestDelay);
  });

  // User
  socket.on('disconnect', user.disconnected);
  socket.on('login', async (loginUser) => user.login(socket, loginUser));
  socket.on('register', async (registerUser) => user.register(socket, registerUser));

  // Library
  socket.on('getAlbums', async (user) => library.getAlbums(socket, user));
  socket.on('addAlbum', async (album, user) => library.addAlbum(socket, album, user));

  // Search

  // Play
}

export default socketEvents;