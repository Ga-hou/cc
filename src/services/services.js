import { Axios } from "./axios";

export function services(url, data) {
  return new Promise((resolve, reject) => {
    Axios.request({
      method: "post",
      url,
      data
    })
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(e => {
        console.error("services fail", e.data);
        reject(e.data);
      });
  });
}
// function handleError(code) {
//   if (code === 401) {
//     window.localStorage.removeItem("access_token");
//     // window.location.href = "/login";
//   }
// }
