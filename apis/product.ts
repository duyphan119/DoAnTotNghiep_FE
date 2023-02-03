import { privateAxios, publicAxios } from "../config/configAxios";
import { PaginationParams, QueryParams } from "../utils/types";

export type ProductQueryParams = QueryParams &
  Partial<{
    slug: string;
    name: string;
    group_product_slug: string;
    product_variants: boolean;
    images: boolean;
    group_product: boolean;
    q: string;
  }>;

export type CreateProductDTO = {
  name: string;
  slug?: string;
  groupProductId: number;
  thumbnail?: number;
  description?: string;
  detail?: string;
};

export type SearchProductParams = PaginationParams &
  Partial<{
    q: string;
  }>;

export const getAllProducts = (params?: ProductQueryParams): Promise<any> =>
  publicAxios().get("product", { params });

export const getProductById = (id: number): Promise<any> =>
  publicAxios().get("product/" + id);

export const createProduct = (body: CreateProductDTO): Promise<any> =>
  privateAxios().post("product", body);

export const updateProduct = (
  id: number,
  body: Partial<CreateProductDTO>
): Promise<any> => privateAxios().patch(`product/${id}`, body);

export const searchProducts = (params?: SearchProductParams): Promise<any> =>
  publicAxios().get("product/search", { params });

export const getFavoriteProducts = (params?: PaginationParams): Promise<any> =>
  privateAxios().get("product/favorite/user", { params });

export const createFavoriteProduct = (productId: number): Promise<any> =>
  privateAxios().post("product/favorite", { productId });

export const deleteFavoriteProduct = (productId: number): Promise<any> =>
  privateAxios().delete("product/favorite/" + productId);

export const updateThumbnailProduct = (
  productId: number,
  thumbnail: string
): Promise<any> =>
  privateAxios().patch("product/thumbnail/" + productId, { thumbnail });

export const softDeleteProduct = (id: number): Promise<any> =>
  privateAxios().delete("product/soft/" + id);

export const restoreProduct = (id: number): Promise<any> =>
  privateAxios().delete("product/restore/" + id);

export const deleteProduct = (id: number): Promise<any> =>
  privateAxios().delete("product/" + id);
