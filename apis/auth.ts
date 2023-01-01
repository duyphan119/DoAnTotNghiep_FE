import { privateAxios, publicAxios } from "../config/configAxios";

export type ChangeProfile = {
  email: string;
  fullName: string;
  phone: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  fullName: string;
  phone: string;
} & LoginDTO;

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export const logout = (): Promise<any> => publicAxios().delete("auth/logout");

export const changeProfile = (body: ChangeProfile): Promise<any> =>
  privateAxios().patch("auth/change-profile", body);

export const login = (body: LoginDTO): Promise<any> =>
  publicAxios().post("auth/login", body);

export const register = (body: RegisterDTO): Promise<any> =>
  publicAxios().post("auth/register", body);

export const refreshToken = (): Promise<any> =>
  publicAxios().patch("auth/refresh");

export const changePassword = (body: ChangePassword): Promise<any> =>
  privateAxios().patch("auth/change-password", body);

export const getProfile = (): Promise<any> =>
  privateAxios().get("auth/profile");
