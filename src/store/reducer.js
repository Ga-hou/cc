import { combineReducers } from "redux";
import { userInfoReducer } from "./userInfo/reducer";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer
});
