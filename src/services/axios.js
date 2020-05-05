import axios from "axios";
import { Modal, message } from "antd";
import { getToken, removeToken } from "../utils/token";
const service = axios.create({
  baseURL: process.env.REACT_APP_REQUEST_API,
  timeout: 60000
});

const pending = {};
const CancelToken = axios.CancelToken;

// 删除重复请求
const removePending = (config, f) => {
  const url = config.url.replace(config.baseURL, "/");
  const flagUrl =
    url + "&" + config.method + "&" + JSON.stringify(config.params);
  if (flagUrl in pending) {
    if (f) {
      f();
    } else {
      delete pending[flagUrl];
    }
  } else {
    if (f) {
      pending[flagUrl] = f;
    }
  }
};
service.interceptors.request.use(
  config => {
    config.cancelToken = new CancelToken(c => {
      removePending(config, c);
    });
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    removePending(response.config);
    return response.data;
  },
  error => {
    removePending(error.config);
    if (!axios.isCancel(error)) {
      if (error.response.status === 401 && getToken()) {
        removeToken();
        Modal.error({
          title: "登录已过期",
          content: "请重新登录",
          onOk: () => {
            window.location.reload();
          }
        });
      } else {
        message.error(error.response.data.error);
      }
      return Promise.reject(error.response);
    } else {
      return Promise.resolve({});
    }
  }
);

export const Axios = service;
