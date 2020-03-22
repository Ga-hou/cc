import SimpleWebRtc from "../../../utils/simplewebrtc-with-adapter.bundle";
import * as MessageUtil from "../../../utils/MessageUtil";
class UserSocket {
  constructor() {
    this.socket = null;
    this.id = null;
    this.events = {};
  }

  on(event, cb) {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
  }

  open() {
    this.socket = new SimpleWebRtc({
      url: "http://localhost:8082/user"
    });
    this.init();
  }

  close() {
    this.socket.disconnect();
    this.socket = null;
    this.events = {};
  }

  init() {
    console.log(this.socket);
    this.socket.on("connectionReady", () => {
      this.login();
    });
    this.socket.connection.on("login", () => this.handleLogin());
    this.socket.connection.on("create", data => this.handleCreate(data));
    this.socket.connection.on("message", data => this.handleMessage(data));
  }

  login() {
    console.log("user socket login");
    this.socket.connection.emit("login");
  }

  send(data) {
    const message = this.createTextMessage(data);
    this.socket.connection.emit("message", message);
    return message;
  }

  handleLogin() {
    const id = this.socket.connection.getSessionid();
    this.socket.createRoom(id);
  }

  handleCreate() {
    this.handleTriggerWelcome();
  }

  handleMessage(message) {
    if (this.events["message"] instanceof Array) {
      this.events["message"].forEach(cb => {
        if (typeof cb === "function") {
          cb(message);
        }
      });
    }
  }

  handleTriggerWelcome() {
    this.socket.connection.emit("system", {
      type: 1
    });
  }

  // socket.io
  getConnection() {
    return this.socket.connection;
  }

  createTextMessage(data) {
    console.log(this);
    return MessageUtil.createTextMessage(this.getConnection().id, {
      text: data
    });
  }
}

export default new UserSocket();
