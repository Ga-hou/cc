import { message, Modal } from "antd";
import { store } from "../store";
import * as MessageUtil from "./MessageUtil";
import SimpleWebRtc from "./simplewebrtc-with-adapter.bundle";
// import SimpleWebRtc from "simplewebrtc/out/simplewebrtc-with-adapter.bundle";
import {
  setLoading,
  setSocketRoom,
  updateMessage,
  addSocketRoom,
  resetSocketRoom,
  updateCallType,
  stopVideoCall
} from "../store/socket/action";
import { delUserInfo } from "../store/userInfo/action";

class AgentSocket {
  constructor() {
    this.events = {};
    this.socket = null;
    this.id = null;
  }

  open() {
    console.log("agent socket open");
    this.socket = new SimpleWebRtc({
      url: process.env.REACT_APP_SOCKET_API,
      localVideoEl: "agent-local-video",
      remoteVideosEl: "agent-remote-videos",
      debug: false,
      autoRequestMedia: true,
      detectSpeakingEvents: true,
      autoAdjustMic: true,
      media: {
        video: true,
        audio: true
      }
    });
    this.init();
  }

  close() {
    this.socket.leaveRoom();
    this.socket.disconnect();
    this.socket = null;
    this.id = null;
    store.dispatch(resetSocketRoom());
    console.log("webrtc close");
  }

  join(roomName) {
    return new Promise((resolve, reject) => {
      this.socket.joinRoom(roomName, (err, name) => {
        if (err) reject(err);
        resolve(roomName);
        console.log(name);
      });
    });
  }

  logout() {}

  init() {
    this.socket.connection.on("event", event => {
      console.log("socket receive event", event);
      if (event.payload.type === 1) {
        store.dispatch(
          addSocketRoom({
            ...event.payload.room,
            type: "call"
          })
        );
      }
    });
    this.socket.on("connectionReady", id => {
      this.id = id;
      console.log("坐席连接完成");
      this.login();
    });
    this.socket.on("localStream", () => {
      console.warn("localStream");
      this.socket.pause();
    });
    this.socket.on("createdPeer", peer => {
      console.warn("createdPeer", peer);
    });
    this.socket.on("videoAdded", (video, peer) => {
      console.warn("videoAdded", video);
      if (video.id.indexOf(this.id) !== -1) return;
      document.getElementById("agent-remote-video").appendChild(video);
    });
    this.socket.connection.on("login", event => {
      console.log("坐席登录响应");
      if (event.payload.statusCode !== 200) {
        Modal.error({
          title: "登录失败",
          content: "请重新登录",
          onOk: () => {
            store.dispatch(delUserInfo());
          }
        });
      } else {
        this.getRooms();
      }
    });
    this.socket.connection.on("message", data => {
      if (data.type === "chat") {
        store.dispatch(updateMessage(data.payload));
      }
      if (data.type === "call") {
        if (data.payload.text === null) {
          store.dispatch(stopVideoCall());
        }
        store.dispatch(updateCallType(data.payload.text));
      }
    });
    // 房间列表
    this.socket.connection.on("rooms", data => {
      if (data.payload.error) {
        return message.error(data.payload.error);
      }
      store.dispatch(setLoading(false));
      store.dispatch(setSocketRoom(data.payload.data));
    });
  }

  login() {
    console.log("坐席登录");
    const userInfo = store.getState().userInfo;
    const msg = this.createTextMessage(userInfo);
    this.socket.connection.emit("login", msg);
  }

  send(data) {
    const message = this.createTextMessage({
      text: data
    });
    this.socket.sendToAll("chat", this.createSendToAllMessage(data));
    store.dispatch(updateMessage(message));
  }

  sendCallMessage(data) {
    this.socket.sendToAll("call", this.createSendToAllMessage(data));
  }

  getRooms() {
    this.socket.connection.emit("rooms", this.createTextMessage({}));
  }

  startLocalVideo() {
    this.socket.resume();
  }
  stopLocalVideo() {
    this.socket.stopLocalVideo();
  }

  createTextMessage(data) {
    return MessageUtil.createTextMessage(
      store.getState().userInfo.username,
      "agent",
      data
    );
  }

  createSendToAllMessage(data) {
    return {
      role: "agent",
      text: data,
      username: store.getState().userInfo.username
    };
  }

  leave() {
    this.socket.leaveRoom();
  }
}

export default new AgentSocket();
