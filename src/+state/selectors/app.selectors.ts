import { createFeatureSelector, createSelector } from '@ngrx/store';

const allRooms = createFeatureSelector<string[]>('allRooms');
const joined = createFeatureSelector<{ room: string | null }>('joined');

export type RoomList = {
  name: string;
  joined: boolean;
}[];

export const selectRoomList = createSelector(
  allRooms,
  joined,
  (all, roomJoined) => {
    return all.map((room) => ({
      name: room,
      joined: room === roomJoined.room,
    }));
  }
);
