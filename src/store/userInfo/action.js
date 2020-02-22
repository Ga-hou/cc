import { SETUSERINFO, DELUSERINFO, AUTHUSERINFO } from "./types";
export function setUserInfo(payload) {
  return {
    type: SETUSERINFO,
    payload
  };
}

export function delUserInfo(payload) {
  return {
    type: DELUSERINFO,
    payload
  };
}

export function authUserInfo(payload) {
  return {
    type: AUTHUSERINFO,
    payload
  };
}
