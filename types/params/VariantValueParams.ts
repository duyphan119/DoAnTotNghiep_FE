import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type VariantValueParams = {
  value?: string;
  variant?: string;
  variantId?: number;
} & PaginationParams &
  SortParams;

export default VariantValueParams;
