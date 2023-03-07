import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type GroupProductParams = {
  name?: string;
  slug?: string;
  relatedSlug?: string;
} & SortParams &
  PaginationParams;

export default GroupProductParams;
