import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type VariantParams = {
  name?: string;
  variant_values?: boolean;
  q?: string;
} & PaginationParams &
  SortParams;

export default VariantParams;
