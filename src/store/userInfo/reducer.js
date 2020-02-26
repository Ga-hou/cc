import { AUTHUSERINFO, DELUSERINFO, SETUSERINFO } from "./types";
const initialState = {
  username: "",
  userRoles: []
};

export function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHUSERINFO:
      return Object.assign({}, state);
    case SETUSERINFO:
      return Object.assign({}, state, action.payload);
    case DELUSERINFO:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}
