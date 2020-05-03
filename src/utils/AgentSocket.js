import { message, Modal } from "antd";
import { store } from "../store";
import * as MessageUtil from "./MessageUtil";
import SimpleWebRtc from "./simplewebrtc-with-adapter.bundle";
// import SimpleWebRtc from "simplewebrtc/out/simplewebrtc-with-adapter.bundle";
import {
  setLoading,
  setSocketRoom,
  updateMessage,
  addSocketRoom
} from "../store/socket/action";
import { delUserInfo } from "../store/userInfo/action";

class AgentSocket {
  constructor() {
    this.events = {};
    this.socket = null;
  }

  open() {
    console.log("agent socket open");
    this.socket = new SimpleWebRtc({
      url: "http://localhost:8082",
      localVideoEl: "local-video",
      debug: false,
      remoteVideosEl: "remote-videos",
      autoRequestMedia: true,
      detectSpeakingEvents: true,
      autoAdjustMic: true,
      media: {
        video: false,
        audio: false
      }
    });
    this.init();
  }

  close() {
    this.socket.leaveRoom();
    this.socket.disconnect();
    this.socket = null;
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
    this.socket.on("connectionReady", () => {
      console.log("坐席连接完成");
      this.login();
    });
    this.socket.on("localStream", () => {
      console.error("localStream");
    });
    this.socket.on("videoAdded", (vide, peer) => {
      console.error("videoAdded");
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
    // this.socket.sendToAll("login", msg);
    this.socket.connection.emit("login", msg);
  }

  send(data) {
    const message = this.createTextMessage({
      text: data
    });
    // this.socket.connection.emit(
    //   "system",
    //   this.createTextMessage({
    //     text: data
    //   })
    // );
    this.socket.sendToAll("chat", this.createSendToAllMessage(data));
    store.dispatch(updateMessage(message));
  }

  getRooms() {
    this.socket.connection.emit("rooms", this.createTextMessage({}));
  }

  startLocalVideo() {
    this.socket.startLocalVideo();
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
