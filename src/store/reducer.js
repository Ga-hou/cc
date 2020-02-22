import { combineReducers } from "redux";
import { userInfoReducer } from "./userInfo/reducers";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer
});
