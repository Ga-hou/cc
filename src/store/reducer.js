import { combineReducers } from "redux";
import { userInfoReducer } from "./userInfo/reducer";
import { socketReducer } from "./socket/reducer";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  socket: socketReducer
});
