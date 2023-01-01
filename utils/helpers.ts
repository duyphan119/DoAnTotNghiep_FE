import {
  OrderItem,
  Product,
  ProductVariantImage,
  RenderVariantValues,
  Variant,
  VariantValue,
} from "./types";

export const formatVariants = (
  variantValues: VariantValue[]
): RenderVariantValues => {
  let result: any = {};
  variantValues.forEach((variantValue: VariantValue) => {
    if (variantValue.variant) {
      if (result[variantValue.variant.name]) {
        result[variantValue.variant.name].push(variantValue);
      } else {
        result[variantValue.variant.name] = [variantValue];
      }
    }
  });
  return {
    keys: Object.keys(result),
    values: result,
  };
};

export const formatProductVariants = (
  product: Product
): RenderVariantValues => {
  let _variants: any = {};
  if (product.productVariants) {
    product.productVariants[0].variantValues.forEach((vv: VariantValue) => {
      if (vv.variant) {
        _variants = Object.assign(_variants, { [vv.variant.name]: [vv] });
      }
    });
    for (let i = 1; i < product.productVariants.length; i++) {
      product.productVariants[i].variantValues.forEach((vv: VariantValue) => {
        if (vv.variant)
          _variants[vv.variant.name] = [
            ..._variants[vv.variant.name].filter(
              (_vv: VariantValue) => _vv.id !== vv.id
            ),
            vv,
          ];
      });
    }
  }
  let keys = Object.keys(_variants);
  keys.forEach((key: string) => {
    _variants[key].sort((a: VariantValue, b: VariantValue) => a.id - b.id);
  });
  return {
    keys,
    values: _variants,
  };
};

export const formatDate = (input: string | number | Date): string => {
  const d = new Date(input);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  return `${date < 10 ? "0" + date : date}-${
    month < 10 ? "0" + month : month
  }-${year}`;
};

export const formatTime = (input: string | number | Date): string => {
  const d = new Date(input);
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
};
export const formatDateTime = (input: string | number | Date): string => {
  return `${formatDate(input)} ${formatTime(input)}`;
};
export const getPriceCartItem = (orderItem: OrderItem): number => {
  return orderItem.productVariant
    ? orderItem.productVariant.price
    : orderItem.product
    ? orderItem.product.price
    : 0;
};
export const getThumbnailOrderItem = (orderItem: OrderItem): string => {
  let pv = orderItem.productVariant;
  let p = orderItem.product;
  if (pv) {
    let p = pv.product;
    if (p) {
      let imgs = p.images;
      let vvs = pv.variantValues;
      if (imgs && vvs) {
        let img = imgs.find(
          (pvi: ProductVariantImage) =>
            vvs.findIndex(
              (vv: VariantValue) => vv.id === pvi.variantValueId
            ) !== -1
        );
        if (img) {
          return img.path;
        }
      }
    }
  }
  return p ? p.thumbnail : "";
};
