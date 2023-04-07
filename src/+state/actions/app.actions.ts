import { createAction, props } from '@ngrx/store';

export const refreshAllRooms = createAction(
  '[App] refresh rooms',
  props<{ rooms: string[] }>()
);

export const join = createAction(
  '[App] join room',
  props<{ roomId: string | null }>()
);

export const leave = createAction('[App] leave room');
