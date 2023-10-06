import { Socket } from "socket.io";
import { disconnected, login, register } from "./routes";
import * as library from './libraryRoutes';
import { ResponseData } from "../models/models";

const requestDelay = 2000;
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

  // 
  socket.on('disconnect', disconnected);
  socket.on('login', async (loginUser) => login(socket, loginUser));
  socket.on('register', async (registerUser) => register(socket, registerUser));

  // Library
  socket.on('getAlbums', async (user) => library.getAlbums(socket, user));
}

export default socketEvents;