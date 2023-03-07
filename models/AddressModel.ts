import DateModel from "./DateModel";

class AddressModel extends DateModel {
  province: string;
  district: string;
  ward: string;
  address: string;
  constructor(obj?: any) {
    super(obj);
    this.province = obj?.province ?? "";
    this.district = obj?.district ?? "";
    this.ward = obj?.ward ?? "";
    this.address = obj?.address ?? "";
  }

  getFullAddress() {
    return `${this.address}, ${this.ward}, ${this.district}, ${this.province}`;
  }
}

export default AddressModel;
