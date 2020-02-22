import { SETUSERINFO, DELUSERINFO, AUTHUSERINFO } from "./types";
export function setUserInfo(payload) {
  return {
    type: SETUSERINFO,
    payload
  };
}

export function delUserInfo(payload) {
  window.localStorage.removeItem("access_token");
  return {
    type: DELUSERINFO,
    payload
  };
}

export function authUserInfo(payload) {
  window.localStorage.setItem("access_token", payload.access_token);
  return {
    type: AUTHUSERINFO,
    payload
  };
}
