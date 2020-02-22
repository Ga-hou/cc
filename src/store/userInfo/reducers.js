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
      state.access_token = action.payload.access_token;
      console.log(state);
      return state;
    case SETUSERINFO:
      return { ...state, ...action.payload };
    case DELUSERINFO:
      return initialState;
    default:
      return state;
  }
}
