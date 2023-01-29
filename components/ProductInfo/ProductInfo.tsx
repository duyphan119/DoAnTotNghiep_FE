import { useSelector } from "react-redux";
import { productDetailSelector } from "../../redux/slice/productDetailSlice";
import { ProductVariantImage, VariantValue } from "../../utils/types";
import DownTabs from "./DownTabs";
import Left from "./Left";
import Right from "./Right";
import styles from "./style.module.css";
type Props = {};

const ProductInfo = (props: Props) => {
  const { product, selectedVariantValues } = useSelector(productDetailSelector);

  if (!product) return <></>;

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
        <Right />
      </div>
      <DownTabs />
    </>
  );
};

export default ProductInfo;
