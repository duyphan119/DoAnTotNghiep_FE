import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type BlogParams = {
  title?: string;
  slug?: string;
  content?: string;
  blogCategoryId?: number;
} & PaginationParams &
  SortParams;

export default BlogParams;
