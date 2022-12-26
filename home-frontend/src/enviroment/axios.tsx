import axios, { Canceler } from "axios";
// import { ErrorCodeEnum } from "../utils/error";
let requestQueue: Canceler[] = [];

export const clearRequest = () => {
  requestQueue.forEach((cancelRequest) => {
    cancelRequest();
  });
  requestQueue = [];
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60 * 1000 * 60,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.params) {
      config.cancelToken = new axios.CancelToken((c) => {
        requestQueue.push(() => c(`Canceled request ${config.url}`));
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = "";
    console.log(error, error.response);

    return Promise.reject({
      ...error,
      message: { text: message, type: "error" },
    });
  }
);

export { instance };

// TODO remove below after changing all axios call from Axios to axios instance defined above
axios.defaults.baseURL = process.env.BACKEND_URL;
// axios.defaults.headers = {
//   ...axios.config.headers,
//   Authorization: localStorage.getItem("token")
//     ? "Bearer " + localStorage.getItem("token")
//     : "",
// };
