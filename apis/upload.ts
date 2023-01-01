import { publicAxios } from "../config/configAxios";

export const uploadSingle = (formData: FormData): Promise<any> =>
  publicAxios().post("upload/single", formData);
export const uploadMultiple = (formData: FormData): Promise<any> =>
  publicAxios().post("upload/multiple", formData);
