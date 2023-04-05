import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {
  constructor(private router: Router, private http: HttpClient) {}
  onSubmit(form: NgForm) {
    console.log('form :>> ', form);
  }
  click() {
    this.http.get('http://localhost:3000/something').subscribe((data) => {
      console.log('data :>> ', data);
    });
  }
}
