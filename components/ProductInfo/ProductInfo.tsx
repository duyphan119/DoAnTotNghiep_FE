import { Grid } from "@mui/material";
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
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12} lg={6}>
            <Left thumbnail={product.thumbnail} images={getImages()} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Right />
          </Grid>
        </Grid>
      </div>
      <DownTabs />
    </>
  );
};

export default ProductInfo;
