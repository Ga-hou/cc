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
      url: process.env.REACT_APP_SOCKET_API,
      localVideoEl: "user-local-video",
      debug: false,
      remoteVideosEl: "user-remote-video",
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
    this.events = {};
  }

  init() {
    this.socket.on("connectionReady", sessionId => this.login(sessionId));
    this.socket.connection.on("login", () => this.handleLogin());
    this.socket.connection.on("message", data => this.handleMessage(data));
    this.socket.connection.on("create", data => this.handleCreate(data));
    this.socket.connection.on("call", data => this.handleCallEvent(data));
    this.socket.on("createdPeer", peer => {
      console.warn("createdPeer", peer);
    });
    this.socket.on("joinedRoom", roomName => {
      console.warn("JoinedRoom", roomName);
    });
    this.socket.on("localStream", () => {
      console.warn("localStream");
    });
    this.socket.on("videoAdded", (video, peer) => {
      console.warn("坐席的video", video);
      document.getElementById("user-remote-video").appendChild(video);
    });
  }

  /**
   * 创建房间
   */
  login(sessionId) {
    this.id = sessionId;
    console.warn("用户登录并创建房间", this.id);
    this.socket.createRoom(
      this.createTextMessage({
        text: this.id
      })
    );
  }

  send(data) {
    console.warn("用户ID", this.id);
    const message = this.createTextMessage({
      text: data
    });
    this.socket.connection.emit("system", message);
    this.socket.sendToAll("chat", message);
    return message;
  }

  sendCallMessage(data) {
    this.socket.sendToAll("call", this.createSendToAllMessage(data));
  }

  handleLogin() {
    this.handleTriggerWelcome();
  }

  handleMessage(data) {
    if (this.events["message"] instanceof Array) {
      this.events["message"].forEach(cb => {
        if (typeof cb === "function" && data.type === "chat") {
          cb(data);
        }
      });
    }
    if (this.events["call"] instanceof Array) {
      this.events["call"].forEach(cb => {
        if (typeof cb === "function" && data.type === "call") {
          cb(data);
        }
      });
    }
  }

  handleTriggerWelcome() {
    this.socket.connection.emit(
      "system",
      this.createTextMessage({
        type: 1
      })
    );
  }

  // socket.io
  getConnection() {
    return this.socket.connection.connection;
  }

  createTextMessage(payload) {
    return MessageUtil.createTextMessage(
      this.getConnection().id,
      "user",
      payload,
      "chat"
    );
  }

  createSendToAllMessage(data) {
    return {
      role: "user",
      text: data,
      username: this.getConnection().id
    };
  }

  handleCreate(data) {
    console.log("用户创建房间成功", data);
    this.handleTriggerWelcome();
  }

  startLocalVideo() {
    this.socket.startLocalVideo();
  }
  getPeers() {
    this.socket.getPeers().forEach(peer => {
      this.socket.handlePeerStreamAdded(peer);
    });
  }
}

export default new UserSocket();
