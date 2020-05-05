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
  RESETSOCKETROOM,
  UPDATECALLTYPE,
  STOPVIDEOCALL
} from "./types";

const initialState = {
  rooms: [],
  currentRoom: null,
  roomMessage: {},
  // currentRoomMessage: [],
  videoRoom: null,
  loading: true,
  callType: null
};

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case RESETSOCKETROOM:
      return initialState;
    case SETSOCKETROOM:
      state.rooms = action.payload;
      // state.currentRoomMessage = [];
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
      if (
        action.payload.roomName &&
        !Array.isArray(state.roomMessage[action.payload.roomName])
      ) {
        state.roomMessage[action.payload.roomName] = [];
      }
      return Object.assign({}, state);
    case UPDATEMESSAGE:
      if (Array.isArray(state.roomMessage[state.currentRoom.roomId])) {
        state.roomMessage[state.currentRoom.roomId].push(action.payload);
      }
      // state.currentRoomMessage.push(action.payload);
      return Object.assign({}, state);
    case SETVIDEOROOM:
      state.videoRoom = state.currentRoom;
      state.callType = "call";
      return Object.assign({}, state);
    case STOPVIDEOCALL:
      state.videoRoom = null;
      state.callType = null;
      return Object.assign({}, state);
    case UPDATECALLTYPE:
      state.callType = action.payload;
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
