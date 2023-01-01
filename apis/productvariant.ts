import { privateAxios, publicAxios } from "../config/configAxios";
import { ProductVariant, QueryParams } from "../utils/types";

export type ProductVariantQueryParams = {
  productId?: number;
  variant_values?: boolean;
} & QueryParams;

export type CreateProductVariant = {
  productId: number;
  price: number;
  inventory: number;
  name: string;
};

export const getAllProductVariants = (
  params: ProductVariantQueryParams
): Promise<any> => publicAxios().get("product-variant", { params });

export const deleteProductVariant = (id: number): Promise<any> =>
  privateAxios().delete("product-variant/" + id);

export const updateProductVariants = (
  productVariants: ProductVariant[]
): Promise<any> =>
  privateAxios().patch("product-variant/many", { productVariants });

export const createProductVariants = (
  inputs: CreateProductVariant[]
): Promise<any> => privateAxios().post("product-variant/many", { inputs });
