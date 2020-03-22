import { ulid } from "ulid";

export function createTextMessage(username, data) {
  return {
    id: ulid(),
    timestamp: Date.now(),
    flow: "out",
    from: username,
    username,
    payload: data,
    postedOn: new Date().toLocaleString("en-GB")
  };
}

export function scrollToBottom() {
  setTimeout(() => {
    const messageWrapper = document.getElementById("messageWrapper");
    if (messageWrapper) messageWrapper.scrollTop = messageWrapper.scrollHeight;
  }, 0);
}
