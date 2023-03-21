import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {
  constructor(private router: Router) {}
  onSubmit(form: NgForm) {
    console.log('form :>> ', form);
  }
}
