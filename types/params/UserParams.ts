import PaginationParams from "./PaginationParams";
import SortParams from "./SortParams";

type UserParams = {
  fullName?: string;
  phone?: string;
  email?: string;
  isAdmin?: boolean;
} & PaginationParams &
  SortParams;

export default UserParams;
