import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type VariantParams = {
  name?: string;
  variant_values?: boolean;
} & PaginationParams &
  SortParams;

export default VariantParams;
