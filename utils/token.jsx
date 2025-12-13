import { configs } from "../libs/configs";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(configs.localstorageEgyIntstituteTokenName);
  }
  return null;
};
