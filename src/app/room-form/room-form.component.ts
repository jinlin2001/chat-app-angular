import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { actions } from 'src/+state';
import { SocketIOService } from 'src/services/socketio.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnDestroy {
  title: string;
  create: boolean;
  roomId?: string;
  params$?: Subscription;

  constructor(
    private router: Router,
    private store: Store,
    private socketIO: SocketIOService,
    private activatedRoute: ActivatedRoute,
    private toastSvcs: ToastrService
  ) {
    this.create = this.activatedRoute.snapshot.data['create'];
    this.roomId = this.activatedRoute.snapshot.params['roomId'];
    this.title = this.create ? 'Create New Room' : `Join Room: ${this.roomId}`;
    if (!this.create) {
      this.params$ = this.activatedRoute.params.subscribe((params) => {
        this.roomId = params['roomId'];
        this.title = `Join Room: ${this.roomId}`;
      });
    }
  }
  ngOnDestroy(): void {
    this.params$?.unsubscribe();
  }

  onSubmit(ngForm: NgForm) {
    const { roomId, roomPass, displayName } = ngForm.value;
    if (this.create) {
      this.newRoom(roomId, roomPass, displayName);
    } else {
      this.joinRoom(roomPass, displayName);
    }
  }

  newRoom(roomId: string, roomPass: string, displayName: string) {
    const { socketIO, router, store } = this;
    socketIO.create(roomId, roomPass).subscribe((success) => {
      if (success) {
        store.dispatch(actions.join({ id: roomId, displayName }));
        router.navigateByUrl('/room');
      } else {
        this.toastSvcs.warning('Failed to create new chat room.');
      }
    });
  }

  joinRoom(roomPass: string, displayName: string) {
    const { socketIO, roomId, router, store } = this;
    socketIO.join(roomId!, roomPass).subscribe((success) => {
      if (success) {
        store.dispatch(actions.join({ id: roomId!, displayName }));
        router.navigateByUrl('/room');
      } else {
        this.toastSvcs.warning('Failed to join, wrong credentials.');
      }
    });
  }
}
