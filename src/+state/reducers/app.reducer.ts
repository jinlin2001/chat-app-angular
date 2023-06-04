import { createReducer, on } from '@ngrx/store';
import { RoomListState } from 'src/services/model';
import { actions } from '../index';

export const allRooms = createReducer(
  { list: [] } as RoomListState,
  on(actions.refreshRooms, (_, { list }) => ({
    list: [...list],
  }))
);
export const connected = createReducer(
  false,
  on(actions.connected, (_) => true)
);

export const joined = createReducer(
  null as any,
  on(actions.join, (_, { id, displayName }) => ({
    id,
    displayName,
  })),
  on(actions.leave, () => null as any)
);
