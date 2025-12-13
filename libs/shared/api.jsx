import { getToken } from "../../utils/token";
import { configs } from "../configs";

const { default: axios } = require("axios");
const { base_url } = require("../constant");

const apiInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json"
  }
})

apiInstance.interceptors.request.use(
  (config) => {
  const token = getToken();
  console.log("token" , token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.log("intercerptors error", error)
})

const _get = (url, config = {}) => {
  return apiInstance.get(url, config);
}

const _delete = (url, config = {}) => {
  return apiInstance.delete(url, config);
}

const _post = (url, data = {}, config = {}) => {
  return apiInstance.post(url, data, config);
}

const _put = (url, data, config = {}) => {
  return apiInstance.put(url, data, config);
};

export { _get, _post, _delete, _put };