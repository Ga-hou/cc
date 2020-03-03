import { DELSOCKETROOM, SETSOCKETROOM, SETCURRENTROOM } from "./types";

export function setSocketRoom(payload) {
  return {
    type: SETSOCKETROOM,
    payload
  };
}

export function delSocketRoom(payload) {
  return {
    type: DELSOCKETROOM,
    payload
  };
}

export function setCurrentRoom(payload) {
  return {
    type: SETCURRENTROOM,
    payload
  };
}
