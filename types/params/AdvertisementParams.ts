import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type AdvertisementParams = {
  title?: string;
  page?: string;
} & PaginationParams &
  SortParams;

export default AdvertisementParams;
