import { Button } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
import { productSelector } from "../../../../redux/slice/productSlice";
import {
  productVariantActions,
  productVariantSelector,
} from "../../../../redux/slice/productVariantSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ProductVariant } from "../../../../utils/types";
import styles from "../_style.module.scss";
import TrItem from "../TrItem";
import { ProductVariantModel } from "../../../../models";

type Props = {
  title?: string;
};

const Wrapper = ({ title }: Props) => {
  const appDispatch = useAppDispatch();
  const { current: product } = useSelector(productSelector);
  const { productVariants, inputs } = useSelector(productVariantSelector);
  const handleClick = () => {
    if (productVariants) {
      if (product) {
        const productId = product.id;
        appDispatch(
          productVariantActions.fetchCreateMany(
            inputs.map((input: ProductVariantModel) => ({
              ...input,
              productId,
            }))
          )
        );
      } else {
        appDispatch(
          productVariantActions.fetchUpdateMany(
            productVariants.map((item: ProductVariantModel) => {
              const { id, name, price, inventory, productId } = item;
              return { id, dto: { name, price, inventory, productId } };
            })
          )
        );
      }
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
            ? inputs.map((input, index) => <TrItem key={index} input={input} />)
            : null}
          {productVariants?.map((productVariant) => {
            return (
              <TrItem
                key={productVariant.id}
                input={productVariant}
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
