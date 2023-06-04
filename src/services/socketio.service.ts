import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { serverUrl } from '../environment';
import { Store } from '@ngrx/store';
import { actions } from '../+state';
import { Observable, Subject } from 'rxjs';
import { MsgResponse } from './model';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  socket: Socket = io(serverUrl);
  newMsg$ = new Subject<MsgResponse>();
  roomSet = new Set<string>();
  constructor(private store: Store) {
    this.socket.on('connect', () => {
      this.store.dispatch(actions.connected());
    });
  }

  create(id: string, pass: string) {
    return new Observable((observer) => {
      this.socket.emit('create', id, pass, (status: boolean) => {
        observer.next(status);
      });
    });
  }

  join(id: string, pass: string) {
    return new Observable((observer) => {
      this.socket.emit('join', id, pass, (status: boolean) => {
        observer.next(status);
      });
    });
  }

  leave(id: string) {
    this.socket.emit('leave', id);
  }

  post(id: string, msg: string, displayName: string) {
    this.socket.emit('post', id, msg, displayName);
  }
}
