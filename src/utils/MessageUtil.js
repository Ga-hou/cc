import { ulid } from "ulid";

export function createTextMessage(username, role, data, type) {
  return {
    id: ulid(),
    timestamp: Date.now(),
    flow: "out",
    from: username,
    payload: data,
    username,
    role,
    type
  };
}

export function scrollToBottom(id) {
  setTimeout(() => {
    const messageWrapper = document.getElementById(id);
    if (messageWrapper) messageWrapper.scrollTop = messageWrapper.scrollHeight;
  }, 0);
}
