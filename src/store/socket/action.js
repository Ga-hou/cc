import {
  DELSOCKETROOM,
  SETSOCKETROOM,
  SETCURRENTROOM,
  UPDATEMESSAGE,
  SETVIDEOROOM,
  STOPVIDEOROOM,
  SETLOADING,
  ADDSOCKETROOM,
  UPDATESOCKETROOM,
  RESETSOCKETROOM
} from "./types";
import IM from "../../utils/AgentSocket";
import AgentSocket from "../../utils/AgentSocket";

export function resetSocketRoom() {
  return {
    type: RESETSOCKETROOM
  };
}

export function setSocketRoom(payload) {
  payload.forEach(room => {
    IM.join(room.roomName);
  });
  return {
    type: SETSOCKETROOM,
    payload
  };
}

export function addSocketRoom(payload) {
  return {
    type: ADDSOCKETROOM,
    payload
  };
}

export function delSocketRoom(payload) {
  AgentSocket.leave();
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

export function updateSocketRoom(payload) {
  return {
    type: UPDATESOCKETROOM,
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
  IM.sendCallMessage("calling");
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
