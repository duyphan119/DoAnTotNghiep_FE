import { Grid } from "@mui/material";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { productDetailSelector } from "@/redux/slice/productDetailSlice";
import { Breadcrumbs } from "@/components";
import DownTabs from "./DownTabs";
import Left from "./Left";
import Right from "./Right";
import styles from "./_style.module.scss";
import { publicRoutes } from "@/utils/routes";
import { ProductModel } from "@/models";
type Props = {};

const ProductInfo: FC<Props> = () => {
  const { selectedVariantValues, product } = useSelector(productDetailSelector);

  if (!product) return <></>;

  const images = useMemo(() => {
    if (!product.images) return [];
    const imgs = [...product.images];
    const newImages = imgs.filter((i) =>
      selectedVariantValues.length > 0
        ? selectedVariantValues.findIndex(
            (vv) => vv.id === i.variantValueId
          ) !== -1
        : true
    );
    if (newImages.length === 0) return imgs;
    return newImages;
  }, [product]);

  return (
    <>
      <div className={styles.body}>
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs
              links={[
                {
                  label: "Trang chủ",
                  href: publicRoutes.home,
                },
                {
                  label: "Sản phẩm",
                  href: publicRoutes.products(),
                },
              ]}
              current={product.name}
              sx={{ justifyContent: "flex-start" }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Left images={images} />
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
