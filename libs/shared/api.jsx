import { getToken } from "../../utils/token";
import { configs } from "../configs";
const axios = require("axios");
const { base_url } = require("../constant");

const apiInstance = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    // ✅ تأكيد إن headers موجود
    config.headers = config.headers || {};

    // ✅ لو انت بعت Authorization يدويًا في request سيبه
    if (!config.headers["Authorization"] && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // optional: handle 401 globally
    // if (error?.response?.status === 401) { ...logout... }
    return Promise.reject(error);
  }
);

export const _get = (url, config = {}) => apiInstance.get(url, config);
export const _delete = (url, config = {}) => apiInstance.delete(url, config);
export const _post = (url, data = {}, config = {}) =>
  apiInstance.post(url, data, config);
export const _put = (url, data = {}, config = {}) =>
  apiInstance.put(url, data, config);
