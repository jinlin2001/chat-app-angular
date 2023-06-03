import { createReducer, on } from '@ngrx/store';
import { RoomListState } from 'src/services/model';
import * as AppActions from '../actions/app.actions';

export const allRooms = createReducer(
  { list: [] } as RoomListState,
  on(AppActions.refreshRooms, (_, { list }) => ({
    list: [...list],
  }))
);

export const joined = createReducer(
  null as any,
  on(AppActions.join, (_, { id, displayName }) => ({
    id,
    displayName,
  })),
  on(AppActions.leave, () => null as any)
);
