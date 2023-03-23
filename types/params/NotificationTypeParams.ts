import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type NotificationTypeParams = SortParams &
  PaginationParams & {
    q?: string;
    name?: string;
  };

export default NotificationTypeParams;
