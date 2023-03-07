import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type CommentProductParams = Partial<{
  productId: string;
  content: string;
  star: string;
  user: string;
  depth: string;
}> &
  PaginationParams &
  SortParams;

export default CommentProductParams;
