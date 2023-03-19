import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type VariantValueParams = {
  value?: string;
  variant?: boolean;
  q?: string;
  variantId?: number;
} & PaginationParams &
  SortParams;

export default VariantValueParams;
