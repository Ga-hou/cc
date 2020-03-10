import { ulid } from "ulid";
import { message } from "antd";
import { store } from "../store";
import SimpleWebRtc from "./simplewebrtc-with-adapter.bundle";
// import SimpleWebRtc from "simplewebrtc/out/simplewebrtc-with-adapter.bundle";
import { updateMessage } from "../store/socket/action";
class IM {
  constructor() {
    // this.url = props.url;
    this.socket = null;
    this.events = {};
    this.webrtc = null;
  }

  open() {
    console.log("webrtc open");
    this.webrtc = new SimpleWebRtc({
      url: "192.168.31.17:8888",
      localVideoEl: "local-video",
      autoRequestMedia: false,
      debug: false,
      detectSpeakingEvents: true,
      autoAdjustMic: false
      // media: {
      //   video: false,
      //   audio: false
      // }
    });
    this.webrtc.connection.on("message", data => {
      if (data.type === "chat") {
        store.dispatch(updateMessage(data.payload));
      }
    });
  }

  close() {
    this.webrtc.leaveRoom();
    this.webrtc.disconnect();
    this.webrtc = null;
    console.log("webrtc close");
  }

  login() {
    this.socket.on("login", payload => {
      console.log(payload);
    });
    const userInfo = store.getState().userInfo;
    this.socket.emit(
      "login",
      createTextMessage({
        userInfo
      })
    );
  }

  join(roomName) {
    this.webrtc.joinRoom(roomName, (err, name) => {
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
    this.socket.on("connect", () => {
      this.login();
    });
  }

  send(data) {
    const message = createTextMessage(data);
    this.webrtc.sendToAll("chat", message);
    store.dispatch(updateMessage(message));
  }

  on(type, callback) {
    if (typeof this.events[type] === undefined) {
      this.events[type] = [];
    }
    this.events[type].push(callback);
  }

  off(type, callback) {
    this.events[type].filter(item => item === callback);
  }

  startLocalVideo() {
    this.webrtc.startLocalVideo();
  }
  stopLocalVideo() {
    this.webrtc.stopLocalVideo();
  }
}

export function createTextMessage(data) {
  return {
    id: ulid(),
    timestamp: Date.now(),
    from: store.getState().userInfo.username,
    username: store.getState().userInfo.username,
    message: data,
    postedOn: new Date().toLocaleString("en-GB")
  };
}

export default new IM();
