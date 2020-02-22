import { AUTHUSERINFO, DELUSERINFO, SETUSERINFO } from "./types";
const initialState = {
  username: "",
  staffName: "",
  staffNo: undefined,
  roleId: undefined,
  access_token: ""
};

export function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHUSERINFO:
      return Object.assign({}, state, {
        access_token: action.payload.access_token
      });
    case SETUSERINFO:
      return Object.assign({}, state, action.payload);
    case DELUSERINFO:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}
