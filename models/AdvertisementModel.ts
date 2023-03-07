import DateModel from "./DateModel";

class AdvertisementModel extends DateModel {
  id: number;
  title: string;
  href: string;
  path: string;
  page: string;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.title = obj?.title ?? "";
    this.href = obj?.href ?? "";
    this.path = obj?.path ?? "";
    this.page = obj?.page ?? "";
  }
}

export default AdvertisementModel;
