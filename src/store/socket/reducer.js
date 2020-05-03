import {
  DELSOCKETROOM,
  SETCURRENTROOM,
  SETSOCKETROOM,
  SETVIDEOROOM,
  STOPVIDEOROOM,
  UPDATEMESSAGE,
  SETLOADING,
  ADDSOCKETROOM,
  UPDATESOCKETROOM,
  RESETSOCKETROOM
} from "./types";

const initialState = {
  rooms: [],
  currentRoom: null,
  currentRoomMessage: [],
  videoRoom: null,
  loading: true
};

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case RESETSOCKETROOM:
      return initialState;
    case SETSOCKETROOM:
      state.rooms = action.payload;
      state.currentRoomMessage = [];
      return Object.assign({}, state);
    case ADDSOCKETROOM:
      state.rooms.push(action.payload);
      return Object.assign({}, state);
    case UPDATESOCKETROOM:
      state.rooms.map(item => {
        if (
          action.payload.roomName &&
          action.payload.roomName === item.roomName
        ) {
          return Object.assign(item, action.payload.data);
        }
        return item;
      });
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
    case SETLOADING:
      state.loading = action.payload;
      return Object.assign({}, state);
    case DELSOCKETROOM:
      state.rooms = state.rooms.filter(
        room => room.roomId !== state.currentRoom.roomId
      );
      state.currentRoom = null;
      return Object.assign({}, state);
    default:
      return state;
  }
}
