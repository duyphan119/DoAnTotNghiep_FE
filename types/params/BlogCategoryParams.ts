import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type BlogCategoryParams = {
  name?: string;
  slug?: string;
  description?: string;
  blogs?: true;
} & PaginationParams &
  SortParams;

export default BlogCategoryParams;
