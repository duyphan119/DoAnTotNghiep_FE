import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type NotificationParams = SortParams &
  PaginationParams & {
    q?: string;
    content?: string;
    userId?: number;
    notificationTypeId?: number;
    type?: string;
    unread?: boolean;
  };

export default NotificationParams;
