export default function getContent(childNodes) {
  return Array.from(childNodes)
    .map(child => {
      if (child.childNodes && child.childNodes.length !== 0) {
        return getContent(child.childNodes);
      }
      if (child.nodeName === "#text") {
        return child.textContent;
      }
      if (child.nodeName === "BR") {
        return "\r\n";
      }
      if (child.nodeName === "STYLE") {
        return "";
      }
      if (child.nodeName === "SPAN") {
        return child.innerHTML;
      }
    })
    .join("");
}
