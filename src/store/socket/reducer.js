import { DELSOCKETROOM, SETCURRENTROOM, SETSOCKETROOM } from "./types";

const initialState = {
  rooms: [],
  currentRoom: null
};

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case SETSOCKETROOM:
      state.rooms = action.payload;
      return Object.assign({}, state);
    case SETCURRENTROOM:
      state.currentRoom = action.payload;
      console.log(action.payload);
      return Object.assign({}, state);
    case DELSOCKETROOM:
    default:
      return state;
  }
}
