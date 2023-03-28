import { UserJson } from "@/types/json";
import DateModel from "./DateModel";

class UserModel extends DateModel {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  point: number;

  constructor(obj?: Partial<UserJson> | null) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.fullName = obj?.fullName ?? "";
    this.email = obj?.email ?? "";
    this.phone = obj?.phone ?? "";
    this.isAdmin = obj?.isAdmin ?? false;
    this.point = obj?.point ?? 0;
  }
}

export default UserModel;
