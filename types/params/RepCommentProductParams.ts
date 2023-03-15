import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type RepCommentProductParams = Partial<{
  content: string;
  commentProductId: number;
}> &
  PaginationParams &
  SortParams;

export default RepCommentProductParams;
