import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { serverUrl } from '../../environment';
@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  constructor() {}
}
