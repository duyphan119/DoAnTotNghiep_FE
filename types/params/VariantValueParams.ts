import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type VariantValueParams = {
  value?: string;
  variant?: string;
  q: string;
  variantId?: number;
} & PaginationParams &
  SortParams;

export default VariantValueParams;
