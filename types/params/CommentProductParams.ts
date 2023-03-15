import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type CommentProductParams = Partial<{
  productId: number;
  content: string;
  star: number;
  user: string;
  depth: number;
  product: boolean;
  repComments: boolean;
}> &
  PaginationParams &
  SortParams;

export default CommentProductParams;
