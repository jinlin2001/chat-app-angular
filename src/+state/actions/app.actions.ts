import { createAction, props } from '@ngrx/store';
import { JoinedState, RoomListState } from 'src/services/model';

export const join = createAction('[App] join room', props<JoinedState>());
export const leave = createAction('[App] leave room');
export const refreshRooms = createAction(
  '[App] refresh active chat list',
  props<RoomListState>()
);
