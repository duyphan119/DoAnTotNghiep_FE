import React from "react";
import {
  Product,
  ProductVariantImage,
  Variant,
  VariantValue,
} from "../../utils/types";
import Left from "./Left";
import Right from "./Right";
import styles from "./style.module.css";
type Props = {
  product?: Product;
};
const ProductInfo = (props: Props) => {
  const [selectedVariantValues, setSelectedVariantValues] = React.useState<
    VariantValue[]
  >([]);

  const clickVariantValue = (variantValue: VariantValue) => {
    const newArr = [...selectedVariantValues];
    const index = selectedVariantValues.findIndex(
      (i: VariantValue) =>
        i.variant &&
        variantValue.variant &&
        i.variant.name === variantValue.variant.name
    );
    if (index === -1) newArr.push(variantValue);
    else newArr[index] = variantValue;
    setSelectedVariantValues(newArr);
  };

  return props.product ? (
    <div className={styles.body}>
      <Left
        thumbnail={props.product.thumbnail}
        images={
          props.product.images
            ? [...props.product.images].filter((i: ProductVariantImage) =>
                selectedVariantValues.length > 0
                  ? selectedVariantValues.findIndex(
                      (vv: VariantValue) => vv.id === i.variantValueId
                    ) !== -1
                  : true
              )
            : []
        }
      />
      <Right
        product={props.product}
        selectedVariantValues={selectedVariantValues}
        onClickVariantValue={clickVariantValue}
      />
    </div>
  ) : null;
};

export default ProductInfo;
