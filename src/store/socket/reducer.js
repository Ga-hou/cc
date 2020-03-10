import {
  DELSOCKETROOM,
  SETCURRENTROOM,
  SETSOCKETROOM,
  SETVIDEOROOM,
  STOPVIDEOROOM,
  UPDATEMESSAGE
} from "./types";

const initialState = {
  rooms: [],
  currentRoom: null,
  currentRoomMessage: [],
  videoRoom: null
};

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case SETSOCKETROOM:
      state.rooms = action.payload;
      state.currentRoomMessage = [];
      return Object.assign({}, state);
    case SETCURRENTROOM:
      state.currentRoom = action.payload;
      return Object.assign({}, state);
    case UPDATEMESSAGE:
      state.currentRoomMessage.push(action.payload);
      return Object.assign({}, state);
    case SETVIDEOROOM:
      state.videoRoom = state.currentRoom;
      return Object.assign({}, state);
    case STOPVIDEOROOM:
      state.videoRoom = null;
      return Object.assign({}, state);
    case DELSOCKETROOM:
    default:
      return state;
  }
}
