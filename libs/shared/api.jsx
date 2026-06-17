import toast from "react-hot-toast";
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
    const token2 = localStorage.getItem(
      configs.localstorageEgyIntstituteTokenName
    );

    // ✅ تأكيد إن headers موجود
    config.headers = config.headers || {};

    // ✅ لو انت بعت Authorization يدويًا في request سيبه
    if (!config.headers["Authorization"] && token2) {
      config.headers["Authorization"] = `Bearer ${token2}`;
    }

    return config;
  },
  (error) => {
    console.log("error", error);
    Promise.reject(error)
  }
);

apiInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // optional: handle 401 globally
    // if (error?.response?.status === 401) { ...logout... }
    console.log("error",error);
    if(error?.status == 401) {
      toast.error("Must login first!");
      window.location.href = "/login";
      // window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const _get = (url, config = {}) => apiInstance.get(url, config);
export const _delete = (url, config = {}) => apiInstance.delete(url, config);
export const _post = (url, data = {}, config = {}) =>
  apiInstance.post(url, data, config);
export const _put = (url, data = {}, config = {}) =>
  apiInstance.put(url, data, config);
