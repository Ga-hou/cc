import io from "socket.io-client";
import { ulid } from "ulid";
import { store } from "../store";

class IM {
  constructor() {
    // this.url = props.url;
    this.socket = null;
    this.events = {};
  }

  open() {
    if (this.socket === null) {
      this.socket = io("http://localhost:8989");
      this.init();
    }
  }

  close() {
    this.socket.close();
    this.socket = null;
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
    this.socket.emit("message", createTextMessage(data));
    this.socket.emit("login", createTextMessage(data));
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
}

export function createTextMessage(data) {
  return {
    id: ulid(),
    timestamp: Date.now(),
    flow: "out",
    from: store.getState().userInfo.username,
    payload: {
      data
    }
  };
}

export default new IM();
