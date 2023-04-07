import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketIOService } from '../services/socketio.service';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {
  ss = Array(2000);
  constructor(
    private router: Router,
    private http: HttpClient,
    private socketIO: SocketIOService
  ) {}
  onSubmit(form: NgForm) {
    // console.log('form :>> ', form);
  }
  click() {
    this.http.get('http://localhost:3000/something').subscribe((data) => {
      console.log('data :>> ', data);
    });
  }
  createRoom() {
    this.socketIO.createRoom('room1', 'pass1');
  }
  joinRoom() {
    this.socketIO.joinRoom('room1', 'pass1');
  }
  leaveRoom() {
    this.socketIO.leaveRoom('room1');
  }
  postMessage() {
    this.socketIO.postMessage('room1', 'message1');
  }
}
