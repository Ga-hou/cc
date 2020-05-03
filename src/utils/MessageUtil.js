import { ulid } from "ulid";

export function createTextMessage(username, role, data, type) {
  return {
    id: ulid(),
    sid: "" + Date.now(),
    roomType: "",
    timestamp: Date.now(),
    flow: "out",
    from: username,
    payload: data,
    username,
    role,
    type,
    prefix: ""
  };
}

export function createSendMessage(to, type, payload) {
  return {
    to,
    sid: "" + Date.now(),
    roomType: "",
    type,
    payload
  };
}

export function scrollToBottom(id) {
  setTimeout(() => {
    const messageWrapper = document.getElementById(id);
    if (messageWrapper) messageWrapper.scrollTop = messageWrapper.scrollHeight;
  }, 0);
}
