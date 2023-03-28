import DateJson from "./DateJson";

type UserJson = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  point: number;
} & DateJson;

export default UserJson;
