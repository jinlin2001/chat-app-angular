import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter, take } from 'rxjs';
import { actions, selectors } from 'src/+state/';
import { Msg } from 'src/services/model';
import { SocketIOService } from 'src/services/socketio.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('msgArea') msgArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('msgRef') msgRef!: ElementRef<HTMLDivElement>;
  roomId!: string;
  roomPass!: string;
  displayName!: string;
  msgs: Msg[] = [];
  newMsg$!: Subscription;
  ob!: MutationObserver;
  test = false;
  constructor(
    private socketIO: SocketIOService,
    private store: Store,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {
    this.test = true;
  }
  ngAfterViewInit(): void {
    const { nativeElement } = this.msgRef;
    this.ob = new MutationObserver((mutations) => {
      let total = 0;
      for (const m of mutations) {
        const { addedNodes } = m;
        addedNodes.forEach((n) => {
          if (n.nodeType === n.ELEMENT_NODE) {
            total += (n as HTMLElement).offsetHeight;
          }
        });
      }
      const view = nativeElement.scrollTop + nativeElement.clientHeight;
      const full = nativeElement.scrollHeight;
      const diff = Math.floor(full - view);
      if (diff <= total) {
        nativeElement.scrollTop = nativeElement.scrollHeight;
      }
    });
    this.ob.observe(nativeElement, { childList: true });
    this.toastr.success(`You have joined chat: ${this.roomId}`);
    this.ngZone.runOutsideAngular(() => {
      this.msgArea.nativeElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.submitBtn.nativeElement.click();
        }
      });
    });
  }

  ngOnInit(): void {
    console.log(this.test, 'test val');
    const { socketIO, msgs, store } = this;
    this.newMsg$ = socketIO.newMsg$
      .pipe(filter((msg) => msg.id === this.roomId))
      .subscribe((msg) => {
        console.log('msg received');
        msgs.push({ self: false, msg: msg.msg, displayName: msg.displayName });
      });

    store
      .select(selectors.joined)
      .pipe(take(1))
      .subscribe(({ id, displayName }) => {
        this.roomId = id;
        this.displayName = displayName;
      });
  }

  ngOnDestroy(): void {
    this.newMsg$.unsubscribe();
    this.ob.disconnect();
  }

  post() {
    const { nativeElement } = this.msgArea;
    const { socketIO, msgs, roomId } = this;
    if (nativeElement.value.trim()) {
      socketIO.post(roomId, nativeElement.value, this.displayName);
      msgs.push({ msg: nativeElement.value, self: true, displayName: 'You' });
      nativeElement.value = '';
    }
  }

  leave() {
    this.store.dispatch(actions.leave({ id: this.roomId }));
  }
}
