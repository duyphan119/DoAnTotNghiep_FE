import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { refreshToken } from "../apis/auth";
import {
  BASE_URL,
  COOKIE_ACCESSTOKEN_NAME,
  MSG_SUCCESS,
} from "../utils/constants";

export const publicAxios = () => {
  const instance = axios.create({ withCredentials: true, baseURL: BASE_URL });

  instance.interceptors.response.use((res) => res.data);

  return instance;
};

export const serverSideAxios = (accessToken?: string) => {
  const instance = axios.create({ withCredentials: true, baseURL: BASE_URL });

  instance.interceptors.response.use((res) => res.data);

  instance.interceptors.request.use(
    async (config) => {
      if (config.headers) {
        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
          // console.log(config.headers.authorization)
        } else {
          const res = await refreshToken();
          const { message, data } = res;
          if (message === MSG_SUCCESS) {
            const { accessToken: newAccessToken } = data;
            setCookie(COOKIE_ACCESSTOKEN_NAME, newAccessToken);
            config.headers.authorization = `Bearer ${newAccessToken}`;
          }
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};

export const privateAxios = () => {
  const instance = axios.create({ withCredentials: true, baseURL: BASE_URL });

  instance.interceptors.response.use((res) => res.data);

  instance.interceptors.request.use(
    async (config) => {
      if (config.headers) {
        const accessToken = getCookie(COOKIE_ACCESSTOKEN_NAME)?.toString();
        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
        } else {
          const res = await refreshToken();
          const { message, data } = res;
          if (message === MSG_SUCCESS) {
            const { accessToken: newAccessToken } = data;
            setCookie(COOKIE_ACCESSTOKEN_NAME, newAccessToken);
            config.headers.authorization = `Bearer ${newAccessToken}`;
          }
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};
