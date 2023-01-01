import { privateAxios, publicAxios } from "../config/configAxios";
import { QueryParams } from "../utils/types";

export type ProductVariantImageQueryParams = {
  productId?: number;
} & QueryParams;

export type createProductVariantImageDTO = {
  productId: number;
  path: string;
  publicId: string;
  variantValueId?: number | null;
};

export const getAllProductVariantImages = (
  params: ProductVariantImageQueryParams
): Promise<any> => publicAxios().get("product-variant-image", { params });

export const createProductVariantImages = (
  body: createProductVariantImageDTO[]
): Promise<any> =>
  privateAxios().post("product-variant-image/many", { inputs: body });

export const updateProductVariantImage = (
  id: number,
  variantValueId: number | null
): Promise<any> =>
  privateAxios().patch("product-variant-image/" + id, { variantValueId });

export const deleteProductVariantImage = (id: number): Promise<any> =>
  privateAxios().delete("product-variant-image/" + id);
