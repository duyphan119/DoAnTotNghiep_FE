import { privateAxios } from "../config/configAxios";

export const checkOrderDiscount = (code: string, total: number): Promise<any> =>
  privateAxios().get("order-discount/check", { params: { code, total } });
