import axios from "./axios";

export function services(url, data) {
  const access_token = window.localStorage.getItem("access_token");
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: "post",
        url,
        data,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(res => {
        if ((res.status >= 200 && res.status < 300) || res.status === 403) {
          console.log("services success", res);
          resolve(res.data.data);
        }
        handleError(res.status);
        reject(res.data);
      })
      .catch(e => {
        console.error("services fail", e);
        reject(e);
      });
  });
}
function handleError(code) {
  if (code === 401) {
    window.localStorage.removeItem("access_token");
    window.location.href = "/login";
  }
}
