import { publicAxios } from "@/config/configAxios";

export const getAllSettingWebsite = (): Promise<any> =>
  publicAxios().get("setting-website");

export const getSettingWebsiteByKeys = (keys: string[]): Promise<any> =>
  publicAxios().post("setting-website/keys", { keys });
