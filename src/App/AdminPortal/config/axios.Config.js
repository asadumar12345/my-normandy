import { message } from "antd";
import axios from "axios";
import { codeMessage } from "../utils/request";

const apiLocation = process.env.REACT_APP_BASE_URL;

if (!apiLocation) {
  throw new Error("REACT_APP_BASE_URL is not found");
}
axios.interceptors.response.use((response) => response, manageErrorConnection);

// setAxiosInterceptors();
console.log(`API LOCATION IS ${apiLocation}`);

const initAxiosGlobalConfigs = (token) => {
  axios.defaults.baseURL = apiLocation;
  const _token = token;
  axios.defaults.headers.common["Authorization"] = "Bearer " + _token;
  axios.defaults.headers.common["session-token"] = _token;
  axios.defaults.headers.post["Content-Type"] = "application/json";
};

export default initAxiosGlobalConfigs;

function manageErrorConnection(err) {
  if (err.response && err.response.status !== 400) {
    // picking the right error message according to error code
    let errorMessage = codeMessage[err?.response?.status];
    // this will trigger the `handleError` function in the promise chain
    if (err.response && err.response.status === 401) {
      localStorage.setItem("PERSISTENT_STATE_auth", { data: "" });
    } else {
      message.error(errorMessage);
    }
    return Promise.reject(new Error(errorMessage));
  } else if (err.code === "ECONNREFUSED") {
    // this will trigger the `handlerResponse` function in the promise chain
    // bacause we are not returning a rejection! Just an example
    return "nevermind";
  } else {
    // this will trigger the `handleError` function in the promise chain
    return Promise.reject(err);
  }
}
