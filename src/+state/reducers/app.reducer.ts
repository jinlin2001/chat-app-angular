import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';

export const allRooms = createReducer(
  [] as string[],
  on(AppActions.refreshAllRooms, (_, { rooms }) => {
    return [...rooms];
  })
);

const initialJoined: { room: string | null } = { room: null };
export const joined = createReducer(
  initialJoined,
  on(AppActions.join, (_, { roomId }) => ({
    room: roomId,
  })),
  on(AppActions.leave, () => ({ room: null }))
);
