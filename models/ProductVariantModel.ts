import { ProductVariantJson } from "@/types/json";
import DateModel from "./DateModel";
import ProductModel from "./ProductModel";
import VariantValueModel from "./VariantValueModel";

class ProductVariantModel extends DateModel {
  id: number;
  inventory: number;
  price: number;
  productId: number;
  product: ProductModel;
  name: string;
  code: string;
  variantValues: VariantValueModel[];

  constructor(obj?: Partial<ProductVariantJson>) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.inventory = obj?.inventory ?? 0;
    this.price = obj?.price ?? 0;
    this.productId = obj?.productId ?? 0;
    this.product = new ProductModel(obj?.product);
    this.name = obj?.name ?? "";
    this.variantValues =
      obj?.variantValues?.map((item: any) => new VariantValueModel(item)) ?? [];
    this.code = obj?.code ?? "";

    if (this.variantValues.length > 0 && this.name === "") {
      this.variantValues.sort((a, b) => a.id - b.id);
      this.name = this.variantValues.map((item) => item.value).join(" / ");
    }

    if (this.code === "") {
      let maxLength = 8;

      this.code += `${this.productId}`;
      this.variantValues.forEach((variantValue) => {
        this.code += `${variantValue.id}`;
      });
      if (this.code.length < maxLength) {
        this.code = this.code.padStart(maxLength, "0");
      }
    }
  }

  generateName(): string {
    this.variantValues.sort((a, b) => a.id - b.id);
    return this.variantValues.map((item) => item.value).join(" / ");
  }

  generateCode(): string {
    let code = "";
    let maxLength = 8;

    code += `${this.productId}`;
    this.variantValues.forEach((variantValue) => {
      code += `${variantValue.id}`;
    });
    if (code.length < maxLength) {
      code = code.padStart(maxLength, "0");
    }
    return code;
  }
}

export default ProductVariantModel;
