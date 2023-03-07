import GroupProductModel from "./GroupProductModel";

class GroupProductHeaderModel {
  name: string;
  slug: string;
  items: GroupProductModel[];

  constructor(obj?: any) {
    this.name = obj?.name || "";
    this.slug = obj?.slug || "";
    this.items =
      obj?.items.map((item: any) => new GroupProductModel(item)) || [];
  }
}

export default GroupProductHeaderModel;
