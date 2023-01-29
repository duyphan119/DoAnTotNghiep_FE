import { Button } from "@mui/material";

import { ReactNode } from "react";
import { Product, ProductVariant } from "../../../utils/types";
import { Input, useModalProductVariantContext } from "../ModalProductVariant";
import styles from "../style.module.css";
import TrItem from "../TrItem";

type Props = {
  children?: ReactNode;
  title?: string;
  inputs?: Input[];
  productVariants?: ProductVariant[];
  product?: Product;
};

const Wrapper = ({
  children,
  title,
  inputs,
  productVariants,
  product,
}: Props) => {
  const { onUpdate, onCreate } = useModalProductVariantContext();
  const handleClick = async () => {
    try {
      if (productVariants) {
        onUpdate();
      } else {
        onCreate();
      }
    } catch (error) {
      console.log("Handle click error", error);
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
          {inputs
            ? inputs.map((input: Input, index: number) => (
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

export default Wrapper;
