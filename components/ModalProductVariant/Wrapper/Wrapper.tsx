import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import styles from "../style.module.css";
import { VariantValue, ProductVariant, Product } from "../../../utils/types";
import TrItem from "../TrItem";
import { Input, useModalProductVariantContext } from "../ModalProductVariant";

type Props = {
  children?: ReactNode;
  title?: string;
  inputs?: Input[];
  productVariants?: ProductVariant[];
  product?: Product;
};

const Wrapper = (props: Props) => {
  const { onUpdate, onCreate } = useModalProductVariantContext();
  const handleClick = async () => {
    try {
      if (props.productVariants) {
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
      <div className={styles.generatedSelectedTitle}>{props.title}</div>
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
          {props.inputs?.map((input: Input, index: number) => {
            //   variantValues.sort(
            //     (a: VariantValue, b: VariantValue) => a.id - b.id
            //   );
            return <TrItem key={index} input={input} />;
          })}
          {props.productVariants?.map((productVariant: ProductVariant) => {
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
