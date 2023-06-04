import { Component, Input } from '@angular/core';
import { Msg } from 'src/services/model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export default class MessageComponent {
  @Input() msg!: Msg;
}
