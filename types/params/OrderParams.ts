import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type OrderParams = {
  start?: string;
  end?: string;
  address?: string;
  fullName?: string;
  phone?: string;
  items?: boolean;
  q?: string;
} & PaginationParams &
  SortParams;

export default OrderParams;
