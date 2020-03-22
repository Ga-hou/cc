import {
  DELSOCKETROOM,
  SETSOCKETROOM,
  SETCURRENTROOM,
  UPDATEMESSAGE,
  SETVIDEOROOM,
  STOPVIDEOROOM,
  SETLOADING
} from "./types";
import IM from "../../utils/socket";
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

export function setVideoRoom(payload) {
  IM.startLocalVideo();
  return {
    type: SETVIDEOROOM,
    payload
  };
}

export function stopVideoRoom(payload) {
  IM.stopLocalVideo();
  return {
    type: STOPVIDEOROOM,
    payload
  };
}

export function setLoading(payload) {
  return {
    type: SETLOADING,
    payload
  };
}
