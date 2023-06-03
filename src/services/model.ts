export type Msg = { msg: string; self: boolean; displayName: string };
export type MsgResponse = {
  msg: string;
  id: string;
  displayName: string;
};
export type RoomListState = {
  list: string[];
};
export type JoinedState = { id: string; displayName: string };
