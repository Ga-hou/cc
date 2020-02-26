import JsCookies from "js-cookie";
// import { store } from "../store/store";
// import { authUserInfo } from "../store/userInfo/action";

const TokenKey = "admin-tokenKey";

export function getToken() {
  return localStorage.getItem(JsCookies.get(TokenKey));
}

export function setToken(token) {
  const now = "" + Date.now();
  JsCookies.set(TokenKey, now);
  localStorage.setItem(now, `Bearer ${token}`);
}

export function removeToken() {
  localStorage.removeItem(JsCookies.get(TokenKey));
  JsCookies.remove(TokenKey);
}
