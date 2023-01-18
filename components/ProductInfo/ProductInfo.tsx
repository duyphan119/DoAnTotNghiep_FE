import { useState } from "react";
import { useProductDetailContext } from "../../pages/product/[slug]";
import { ProductVariantImage, VariantValue } from "../../utils/types";
import DownTabs from "./DownTabs";
import Left from "./Left";
import Right from "./Right";
import styles from "./style.module.css";
type Props = {};

const ProductInfo = (props: Props) => {
  const { product } = useProductDetailContext();
  const [selectedVariantValues, setSelectedVariantValues] = useState<
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

  const getImages = () => {
    if (!product.images) return [];
    const images = [...product.images];
    return images.filter((i: ProductVariantImage) =>
      selectedVariantValues.length > 0
        ? selectedVariantValues.findIndex(
            (vv: VariantValue) => vv.id === i.variantValueId
          ) !== -1
        : true
    );
  };

  return (
    <>
      <div className={styles.body}>
        <Left thumbnail={product.thumbnail} images={getImages()} />
        <Right
          selectedVariantValues={selectedVariantValues}
          onClickVariantValue={clickVariantValue}
        />
      </div>
      <DownTabs />
    </>
  );
};

export default ProductInfo;
