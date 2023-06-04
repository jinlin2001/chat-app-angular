import { createAction, props } from '@ngrx/store';
import { JoinedState, RoomListState } from 'src/services/model';

export const join = createAction('[App] join room', props<JoinedState>());
export const leave = createAction('[App] leave room', props<{ id: string }>());
export const connected = createAction('[App] server connected');
export const refreshRooms = createAction(
  '[App] refresh active chat list',
  props<RoomListState>()
);
