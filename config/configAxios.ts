import axios, { GenericAbortSignal } from "axios";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { refreshToken } from "../apis/auth";
import {
  BASE_URL,
  COOKIE_ACCESSTOKEN_NAME,
  MSG_SUCCESS,
} from "../utils/constants";

export const publicAxios = (signal?: GenericAbortSignal) => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    signal,
  });

  instance.interceptors.response.use((res) => res.data);

  return instance;
};

export const serverSideAxios = (accessToken?: string, rToken?: string) => {
  const instance = publicAxios();

  instance.interceptors.request.use(
    async (config) => {
      if (config.headers) {
        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
        } else {
          const { message, data } = await refreshToken(rToken);
          if (message === MSG_SUCCESS) {
            const { accessToken: newAccessToken } = data;
            setCookie(COOKIE_ACCESSTOKEN_NAME, newAccessToken);
            config.headers.authorization = `Bearer ${newAccessToken}`;
          }
        }
      }
      config.withCredentials = true;
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};

export const privateAxios = (signal?: GenericAbortSignal) => {
  const instance = publicAxios(signal);

  instance.interceptors.request.use(
    async (config) => {
      if (config.headers && hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
        const accessToken = getCookie(COOKIE_ACCESSTOKEN_NAME)?.toString();
        let refresh = false;
        if (accessToken) {
          const decoded: any = jwtDecode(accessToken);
          if (decoded) {
            const exp = decoded.exp * 1000;
            if (exp <= new Date().getTime()) {
              refresh = true;
            } else {
              config.headers.authorization = `Bearer ${accessToken}`;
            }
          }
        }
        if (refresh) {
          const res = await refreshToken();
          const { message, data } = res;
          if (message === MSG_SUCCESS) {
            const { accessToken: newAccessToken } = data;
            console.log({ newAccessToken });
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
