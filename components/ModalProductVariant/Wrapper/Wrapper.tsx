import { Button } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
import { productManagementSelector } from "../../../redux/slice/productManagementSlice";
import {
  productVariantActions,
  ProductVariantInput,
  productVariantSelector,
} from "../../../redux/slice/productVariantSlice";
import { useAppDispatch } from "../../../redux/store";
import { ProductVariant } from "../../../utils/types";
import styles from "../_style.module.scss";
import TrItem from "../TrItem";

type Props = {
  title?: string;
};

const Wrapper = ({ title }: Props) => {
  const appDispatch = useAppDispatch();
  const { current: product } = useSelector(productManagementSelector);
  const { productVariants, inputs } = useSelector(productVariantSelector);
  const handleClick = () => {
    if (productVariants) {
      if (product) {
        const productId = product.id;
        appDispatch(
          productVariantActions.fetchCreateProductVariants(
            inputs.map((input: ProductVariantInput) => ({
              ...input,
              productId,
            }))
          )
        );
      }
    } else {
      appDispatch(
        productVariantActions.fetchUpdateProductVariants(productVariants)
      );
    }
  };

  return (
    <div className={styles.generatedSelectedWrapper}>
      <div className={styles.generatedSelectedTitle}>{title}</div>
      <table className={styles.generatedSelected}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Giá bán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inputs && inputs.length > 0
            ? inputs.map((input: ProductVariantInput, index: number) => (
                <TrItem key={index} input={input} />
              ))
            : null}
          {productVariants?.map((productVariant: ProductVariant) => {
            return (
              <TrItem
                key={productVariant.id}
                input={{
                  name: productVariant.name,
                  price: productVariant.price,
                  inventory: productVariant.inventory,
                }}
                hasDeleteBtn={true}
                id={productVariant.id}
              />
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        <Button variant="contained" onClick={handleClick}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default memo(Wrapper);
