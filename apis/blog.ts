import {
  privateAxios,
  publicAxios,
  serverSideAxios,
} from "@/config/configAxios";
import { Blog, QueryParams } from "../utils/types";

export type BlogQueryParams = QueryParams &
  Partial<{
    title: string;
    slug: string;
    content: string;
    blogCategoryId: number;
  }>;

export type CreateBlogDTO = {
  title: string;
  content: string;
  blogCategoryId: number;
  thumbnail?: string;
  heading?: string;
};

export const getAllBlogs = (
  params?: BlogQueryParams,
  accessToken?: string
): Promise<any> => serverSideAxios(accessToken).get("blog", { params });

export const getAllBlogsPublic = (params?: BlogQueryParams): Promise<any> =>
  publicAxios().get("blog", { params });

export const getAllBlogsClient = (params?: BlogQueryParams): Promise<any> =>
  privateAxios().get("blog", { params });

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
