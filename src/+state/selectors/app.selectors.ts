import { createFeatureSelector } from '@ngrx/store';
import { JoinedState, RoomListState } from 'src/services/model';

export const allRooms = createFeatureSelector<RoomListState>('allRooms');
export const joined = createFeatureSelector<JoinedState>('joined');
