import AddressModel from "./AddressModel";

class UserAddressModel extends AddressModel {
  id: number;
  userId: number;
  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.userId = obj?.userId ?? 0;
  }
}

export default UserAddressModel;
