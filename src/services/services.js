import axios from "axios";

export default function services(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: "post",
        url,
        data
      })
      .then(res => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch(e => {
        reject(e);
      });
  });
}
