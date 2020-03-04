import {
  DELSOCKETROOM,
  SETSOCKETROOM,
  SETCURRENTROOM,
  UPDATEMESSAGE
} from "./types";
import IM from "../../utils/IM";
export function setSocketRoom(payload) {
  payload.forEach(room => {
    IM.join(room.roomName);
  });
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

export function updateMessage(payload) {
  return {
    type: UPDATEMESSAGE,
    payload
  };
}
