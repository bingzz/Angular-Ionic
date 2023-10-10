import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { apiURL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: Socket;

  constructor () {
    this.socket = io(apiURL);
  }

  socketIO() {
    return this.socket;
  }
}
