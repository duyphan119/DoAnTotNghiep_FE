import {
  privateAxios,
  publicAxios,
  serverSideAxios,
} from "../config/configAxios";
import { Blog, QueryParams } from "../utils/types";

export type BlogQueryParams = QueryParams &
  Partial<{
    title: string;
    slug: string;
    content: string;
  }>;

export type CreateBlogDTO = {
  title: string;
  content: string;
  thumbnail?: string;
};

export const getAllBlogs = (
  params?: BlogQueryParams,
  accessToken?: string
): Promise<any> => serverSideAxios(accessToken).get("blog", { params });

export const getBlogById = (id: number): Promise<any> =>
  publicAxios().get("blog/" + id);

export const createBlog = (dto: CreateBlogDTO): Promise<any> =>
  privateAxios().post("blog", dto);

export const updateBlog = (id: number, dto: Partial<Blog>): Promise<any> =>
  privateAxios().patch("blog/" + id, dto);

export const softDeleteBlog = (id: number): Promise<any> =>
  privateAxios().delete("blog/soft/" + id);

export const restoreBlog = (id: number): Promise<any> =>
  privateAxios().delete("blog/restore/" + id);

export const deleteBlog = (id: number): Promise<any> =>
  privateAxios().delete("blog/" + id);
