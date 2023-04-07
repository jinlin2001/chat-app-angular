import { Component } from '@angular/core';
import { SocketIOService } from '../services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-app';
  constructor(private socketIO: SocketIOService) {}
}
