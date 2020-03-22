import { message, Modal } from "antd";
import { store } from "../store";
import * as MessageUtil from "./MessageUtil";
import SimpleWebRtc from "./simplewebrtc-with-adapter.bundle";
// import SimpleWebRtc from "simplewebrtc/out/simplewebrtc-with-adapter.bundle";
import {
  setLoading,
  setSocketRoom,
  updateMessage
} from "../store/socket/action";
import { delUserInfo } from "../store/userInfo/action";

class Socket {
  constructor() {
    this.events = {};
    this.socket = null;
  }

  open() {
    console.log("agent socket open");
    this.socket = new SimpleWebRtc({
      url: "http://localhost:8082/agent"
      // localVideoEl: "local-video",
      // autoRequestMedia: false,
      // debug: false,
      // detectSpeakingEvents: true,
      // autoAdjustMic: false
      // media: {
      //   video: false,
      //   audio: false
      // }
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
    this.socket.joinRoom(roomName, (err, name) => {
      if (err) {
        message.error(err);
      }
      console.log(name);
    });
  }

  logout() {}

  init() {
    this.socket.on("event", socket => {
      console.log("socket receive event", socket);
      if (this.events["event"] instanceof Array) {
        this.events["event"].forEach(item => {
          if (typeof item === "function") {
            item(socket);
          }
        });
      }
    });
    this.socket.on("connectionReady", () => {
      console.log("agent socket connection ready");
      this.login();
    });
    this.socket.connection.on("login", err => {
      console.log("login response");
      if (err) {
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
    this.socket.connection.on("rooms", data => {
      store.dispatch(setLoading(false));
      store.dispatch(setSocketRoom(data));
    });
  }

  login() {
    const userInfo = store.getState().userInfo;
    this.socket.connection.emit("login", this.createTextMessage(userInfo));
  }

  send(data) {
    const message = this.createTextMessage(data);
    this.socket.sendToAll("chat", message);
    store.dispatch(updateMessage(message));
  }

  getRooms() {
    this.socket.connection.emit("rooms");
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
      data
    );
  }
}

export default new Socket();
