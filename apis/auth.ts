import { GenericAbortSignal } from "axios";
import { privateAxios, publicAxios } from "@/config/configAxios";

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

export const changeProfile = (
  body: ChangeProfile,
  signal?: GenericAbortSignal
): Promise<any> => privateAxios(signal).patch("auth/change-profile", body);

export const login = (
  body: LoginDTO,
  signal?: GenericAbortSignal
): Promise<any> => publicAxios(signal).post("auth/login", body);

export const register = (
  body: RegisterDTO,
  signal?: GenericAbortSignal
): Promise<any> => publicAxios(signal).post("auth/register", body);

export const refreshToken = (
  token?: string,
  signal?: GenericAbortSignal
): Promise<any> =>
  publicAxios(signal).patch("auth/refresh", { refreshToken: token });

export const changePassword = (
  body: ChangePassword,
  signal?: GenericAbortSignal
): Promise<any> => privateAxios(signal).patch("auth/change-password", body);

export const getProfile = (signal?: GenericAbortSignal): Promise<any> =>
  privateAxios(signal).get("auth/profile");
