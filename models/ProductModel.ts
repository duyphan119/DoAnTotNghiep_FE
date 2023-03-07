import DateModel from "./DateModel";
import GroupProductModel from "./GroupProductModel";
import ProductImageModel from "./ProductImageModel";
import ProductVariantModel from "./ProductVariantModel";
import VariantValueModel from "./VariantValueModel";

class ProductModel extends DateModel {
  id: number;
  name: string;
  slug: string;
  inventory: number;
  price: number;
  thumbnail: string;
  description: string;
  detail: string;
  star: number;
  groupProductId: number;
  groupProduct: GroupProductModel;
  productVariants: ProductVariantModel[];
  images: ProductImageModel[];
  minPrice: number;
  maxPrice: number;
  metaKeywords: string;
  metaDescription: string;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.name = obj?.name ?? "";
    this.slug = obj?.slug ?? "";
    this.inventory = obj?.inventory ?? 0;
    this.price = obj?.price ?? 0;
    this.thumbnail = obj?.thumbnail ?? "";
    this.description = obj?.description ?? "";
    this.detail = obj?.detail ?? "";
    this.star = obj?.star ?? 0;
    this.groupProductId = obj?.groupProductId ?? 0;
    this.groupProduct = new GroupProductModel(obj?.groupProduct);
    this.productVariants =
      obj?.productVariants?.map((item: any) => new ProductVariantModel(item)) ??
      [];
    this.images =
      obj?.images?.map((item: any) => new ProductImageModel(item)) ?? [];
    this.minPrice = obj?.minPrice ?? this.price;
    this.maxPrice = obj?.maxPrice ?? this.price;
    this.metaKeywords = obj?.metaKeywords ?? "";
    this.metaDescription = obj?.metaDescription ?? "";
  }

  rangePrice(preffix?: string, suffix?: string) {
    const _preffix = preffix || "";
    const _suffix = suffix || "";
    return this.minPrice === this.maxPrice
      ? `${_preffix}${this.minPrice}${_suffix}`
      : `${_preffix}${this.minPrice}${_suffix} - ${_preffix}${this.maxPrice}${_suffix}`;
  }

  formatProductVariants(): {
    keys: string[];
    values: {
      [key: string]: VariantValueModel[];
    };
  } {
    let _variants: {
      [key: string]: VariantValueModel[];
    } = {};
    if (this.productVariants && this.productVariants.length > 0) {
      this.productVariants[0].variantValues.forEach((vv) => {
        if (vv.variant) {
          _variants = Object.assign(_variants, { [vv.variant.name]: [vv] });
        }
      });
      for (let i = 1; i < this.productVariants.length; i++) {
        this.productVariants[i].variantValues.forEach((vv) => {
          if (vv.variant)
            _variants[vv.variant.name] = [
              ..._variants[vv.variant.name].filter((_vv) => _vv.id !== vv.id),
              vv,
            ];
        });
      }
    }
    let keys = Object.keys(_variants);
    keys.forEach((key: string) => {
      _variants[key].sort(
        (a: VariantValueModel, b: VariantValueModel) => a.id - b.id
      );
    });
    keys.sort((a, b) => a.localeCompare(b) * -1);
    return {
      keys,
      values: _variants,
    };
  }

  getDescription() {
    return this.description.split("\n");
  }
}

export default ProductModel;
