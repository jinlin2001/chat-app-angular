import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { serverUrl } from '../../environment';
@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  socket: Socket;
  constructor() {
    this.socket = io(serverUrl);
    this.socket.on('connect', () => {
      console.log('connected');
      this.socket.emit('get-rooms');
    });
    this.socket.on('room-list', (data) => {
      console.log(data);
    });
    this.socket.on('message', (data) => {
      console.log(data);
    });
  }
  createRoom(room: string, pass: string) {
    this.socket.emit('create-room', room, pass);
  }
  joinRoom(room: string, pass: string) {
    this.socket.emit('join', room, pass);
  }
  getRooms() {
    this.socket.emit('get-rooms');
  }
  leaveRoom(room: string) {
    this.socket.emit('leave', room);
  }
  postMessage(room: string, message: string) {
    this.socket.emit('post-message', room, message);
  }
}
