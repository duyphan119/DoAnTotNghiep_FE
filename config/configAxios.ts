import axios, { GenericAbortSignal } from "axios";
import { getCookie, setCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { UserApi } from "@/api";
import { BASE_URL, COOKIE_ACCESSTOKEN_NAME } from "@/utils/constants";

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
          const uApi = new UserApi();
          const newAccessToken: string = await uApi.refreshToken(rToken);
          if (newAccessToken) {
            setCookie(COOKIE_ACCESSTOKEN_NAME, newAccessToken, {
              maxAge: 6000,
            });
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

export const privateAxios = (signal?: GenericAbortSignal) => {
  const instance = publicAxios(signal);

  instance.interceptors.request.use(
    async (config) => {
      if (config.headers) {
        const accessToken = getCookie(COOKIE_ACCESSTOKEN_NAME)?.toString();
        if (accessToken) {
          const decoded: any = jwtDecode(accessToken);
          if (decoded) {
            const exp = decoded.exp * 1000;
            if (exp > new Date().getTime()) {
              config.headers.authorization = `Bearer ${accessToken}`;
              return config;
            }
          }
        }
        const uApi = new UserApi();
        const newAccessToken: string = await uApi.refreshToken();
        if (newAccessToken) {
          setCookie(COOKIE_ACCESSTOKEN_NAME, newAccessToken, { maxAge: 6000 });
          config.headers.authorization = `Bearer ${newAccessToken}`;
          return config;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};
