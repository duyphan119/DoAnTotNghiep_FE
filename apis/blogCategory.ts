import { privateAxios, publicAxios } from "../config/configAxios";
import { Blog, QueryParams } from "../utils/types";

export type BlogCategoryQueryParams = QueryParams &
  Partial<{
    name: string;
    slug: string;
    description: string;
    blogs: true;
  }>;

export type CreateBlogCategoryDTO = {
  name: string;
  description?: string;
};

export const getAllBlogCategories = (
  params?: BlogCategoryQueryParams
): Promise<any> => publicAxios().get("blog-category", { params });

export const getBlogCategoryById = (id: number): Promise<any> =>
  publicAxios().get("blog-category/" + id);

export const createBlogCategory = (dto: CreateBlogCategoryDTO): Promise<any> =>
  privateAxios().post("blog-category", dto);

export const updateBlogCategory = (
  id: number,
  dto: Partial<CreateBlogCategoryDTO>
): Promise<any> => privateAxios().patch("blog-category/" + id, dto);

export const softDeleteBlogCategory = (id: number): Promise<any> =>
  privateAxios().delete("blog-category/soft/" + id);

export const restoreBlogCategory = (id: number): Promise<any> =>
  privateAxios().delete("blog-category/restore/" + id);

export const deleteBlogCategory = (id: number): Promise<any> =>
  privateAxios().delete("blog-category/" + id);
