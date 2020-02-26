// import socket from "socket.io-client";
import { ulid } from "ulid";

class IM {
  constructor() {
    // this.url = props.url;
    this.socket = null;
    this.events = {};
  }

  open() {
    if (this.socket === null) {
      // this.socket = socket("http://localhost:8989");
      // this.init();
    }
  }

  login() {}

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
  }

  send(data) {
    this.socket.emit("event", createTextMessage(data));
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
    payload: {
      data
    }
  };
}

export default new IM();
