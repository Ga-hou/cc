import {
  DELSOCKETROOM,
  SETCURRENTROOM,
  SETSOCKETROOM,
  UPDATEMESSAGE
} from "./types";

const initialState = {
  rooms: [],
  currentRoom: null,
  currentRoomMessage: []
};

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case SETSOCKETROOM:
      state.rooms = action.payload;
      state.currentRoomMessage = [];
      return Object.assign({}, state);
    case SETCURRENTROOM:
      state.currentRoom = action.payload;
      console.log(action.payload);
      return Object.assign({}, state);
    case UPDATEMESSAGE:
      state.currentRoomMessage.push(action.payload);
      return Object.assign({}, state);
    case DELSOCKETROOM:
    default:
      return state;
  }
}
