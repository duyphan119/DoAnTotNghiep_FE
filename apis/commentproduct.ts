import { privateAxios, serverSideAxios } from "@/config/configAxios";
import { QueryParams } from "../utils/types";

export type CommentProductQueryParams = QueryParams &
  Partial<{
    productId: number;
    q: string;
    content: string;
    star: number;
    user: boolean;
    depth: number;
  }>;

export type CommentProductDTO = {
  star: number;
  content: string;
  productId: number;
};

export const createCommentProduct = (dto: CommentProductDTO): Promise<any> =>
  privateAxios().post("comment-product", dto);

export const updateCommentProduct = (
  id: number,
  dto: Partial<CommentProductDTO>
): Promise<any> => privateAxios().patch(`comment-product/${id}`, dto);

export const getAllCommentProducts = (
  params?: CommentProductQueryParams,
  accessToken?: string,
  refreshToken?: string
): Promise<any> =>
  serverSideAxios(accessToken, refreshToken).get(`comment-product`, {
    params,
  });

export const getAllCommentProductsClient = (
  params?: CommentProductQueryParams
): Promise<any> =>
  privateAxios().get(`comment-product`, {
    params,
  });
