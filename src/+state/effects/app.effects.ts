import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SocketIOService } from 'src/services/socketio.service';
import { actions } from '..';
import { Observable, mergeMap, tap } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MsgResponse } from 'src/services/model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppEffects {
  connected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.connected),
      tap(() => {
        this.socketSvcs.socket.on('list', (list: string[]) => {
          this.socketSvcs.roomSet = new Set<string>(list);
          this.store.dispatch(actions.refreshRooms({ list }));
        });
        this.socketSvcs.socket.on('msg', (msg: MsgResponse) => {
          this.socketSvcs.newMsg$.next(msg);
        });
      }),
      mergeMap(
        () =>
          new Observable<Action>((sub) => {
            this.socketSvcs.socket.emit('get', (list: string[]) => {
              this.socketSvcs.roomSet = new Set<string>(list);
              sub.next(actions.refreshRooms({ list }));
              sub.complete();
            });
          })
      )
    )
  );

  leaveRoom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.leave),
        tap(({ id }) => {
          this.socketSvcs.leave(id);
          this.router.navigate(['/']);
          this.toastr.success(`You have left chat: ${id}`);
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private socketSvcs: SocketIOService,
    private store: Store,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
