import { publicAxios } from "@/config/configAxios";
import { QueryParams } from "../utils/types";
export type VariantValueQueryParams = Partial<{
  value: string;
  type: string;
  variant: boolean;
}> &
  QueryParams;

export const getAllVariantValues = (
  params?: VariantValueQueryParams
): Promise<any> => publicAxios().get("variant-value", { params });
