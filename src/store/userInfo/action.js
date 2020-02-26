import { SETUSERINFO, DELUSERINFO, AUTHUSERINFO } from "./types";
import { removeToken, setToken } from "../../utils/token";
export function setUserInfo(payload) {
  return {
    type: SETUSERINFO,
    payload
  };
}

export function delUserInfo(payload) {
  removeToken();
  return {
    type: DELUSERINFO,
    payload
  };
}

export function authUserInfo(payload) {
  setToken(payload.token);
  return {
    type: AUTHUSERINFO,
    payload
  };
}
