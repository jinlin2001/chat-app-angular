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
  scroller!: MutationObserver;
  constructor(
    private socketIO: SocketIOService,
    private store: Store,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {}
  ngAfterViewInit(): void {
    const { nativeElement } = this.msgRef;
    this.scroller = new MutationObserver((mutations) => {
      const { scrollTop, clientHeight, scrollHeight } = nativeElement;
      let additionalHeight = 0;
      for (const mutation of mutations) {
        const { addedNodes } = mutation;
        addedNodes.forEach((newNode) => {
          if (newNode.nodeType === newNode.ELEMENT_NODE) {
            additionalHeight += (newNode as HTMLElement).offsetHeight;
          }
        });
      }
      const viewport = scrollTop + clientHeight;
      if (Math.floor(scrollHeight - viewport) <= additionalHeight) {
        nativeElement.scrollTop = scrollHeight;
      }
    });
    this.scroller.observe(nativeElement, { childList: true });
    this.ngZone.runOutsideAngular(() => {
      this.msgArea.nativeElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.submitBtn.nativeElement.click();
        }
      });
    });
    this.toastr.success(`You have joined chat: ${this.roomId}`);
  }

  ngOnInit(): void {
    const { socketIO, msgs, store } = this;
    store
      .select(selectors.joined)
      .pipe(take(1))
      .subscribe(({ id, displayName }) => {
        this.roomId = id;
        this.displayName = displayName;
      });
    this.newMsg$ = socketIO.newMsg$
      .pipe(filter((msg) => msg.id === this.roomId))
      .subscribe((msg) => {
        msgs.push({ self: false, msg: msg.msg, displayName: msg.displayName });
      });
  }

  ngOnDestroy(): void {
    this.newMsg$.unsubscribe();
    this.scroller.disconnect();
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
