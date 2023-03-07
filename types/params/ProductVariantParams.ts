import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type ProductVariantParams = {
  variant_values?: boolean;
  productId?: number;
} & PaginationParams &
  SortParams;

export default ProductVariantParams;
