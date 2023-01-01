import { publicAxios } from "../config/configAxios";
import { QueryParams } from "../utils/types";
export type VariantValueQueryParams = {
  value?: string;
  type?: string;
} & QueryParams;

export const getAllVariantValues = (
  params?: VariantValueQueryParams
): Promise<any> => publicAxios().get("variant-value", { params });
