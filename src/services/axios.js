import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:8080";

Axios.interceptors.response.use(
  res => res,
  error => {
    if (error.response.status === 401) {
      // eslint-disable-next-line no-debugger
      return error.response;
    }
    return error;
  }
);
export default Axios;
