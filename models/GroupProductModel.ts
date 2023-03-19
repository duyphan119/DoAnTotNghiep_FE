import DateModel from "./DateModel";

class GroupProductModel extends DateModel {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  sex: "Nam" | "Nữ" | "Unisex";
  isAdult: boolean;
  metaKeywords: string;
  metaDescription: string;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.name = obj?.name ?? "";
    this.slug = obj?.slug ?? "";
    this.description = obj?.description ?? "";
    this.thumbnail = obj?.thumbnail ?? "";
    this.sex = obj?.sex ?? "Nam";
    this.isAdult = obj?.isAdult ?? true;
    this.metaKeywords = obj?.metaKeywords ?? "";
    this.metaDescription = obj?.metaDescription ?? "";
  }

  getFullName() {
    let fullName = this.name;

    if (!this.isAdult && this.sex === "Nam") fullName += " bé trai";
    else if (!this.isAdult && this.sex === "Nữ") fullName += " bé gái";
    else if (this.isAdult && this.sex === "Nam") fullName += " nam";
    else if (this.isAdult && this.sex === "Nữ") fullName += " nữ";

    return fullName;
  }

  getSuffixName(slug: string) {
    if (
      slug === "nam" ||
      slug === "nu" ||
      slug === "be-trai" ||
      slug === "be-gai"
    ) {
      if (!this.isAdult && this.sex === "Nam") return "Bé trai";
      else if (!this.isAdult && this.sex === "Nữ") return "Bé gái";
      else if (this.isAdult && this.sex === "Nam") return "Nam";
      else if (this.isAdult && this.sex === "Nữ") return "Nữ";
    }
    return "";
  }
}

export default GroupProductModel;
